import { useParams } from "react-router-dom";
import { useState, Dispatch, SetStateAction } from "react";

// dependency
import {
    DragDropContext,
    Droppable,
    OnDragEndResponder,
} from "react-beautiful-dnd";

// components
import { TicketList } from "@/components/TicketList";
import { AddCategoryDialog } from "./addCategory";
import { Button } from "@/components/Button";
import { Loader } from "@/components/Loader";

import { BreadCrumbs } from "@/components/BreadCrumbs";

// utilities
import {
    orderCollection,
    orderTicket,
    toAnotherCollection,
    rearange,
} from "@/utilities";

import { useCollections } from "@/utilities/hook";
import { useDialog } from "@/utilities/store";

// interface
import { CollectionFace, TicketFace, DialogState } from "@/interface";

export const KanbanPage: React.FC = () => {
    const { domain } = useParams();
    const { isActive, toggleDialog } = useDialog<DialogState>((state) => state);
    const { collectionsData, setCollectionsData } = useCollections();

    const [ticketsSetters, setTicketsSetters] = useState<
        | {
              [key: string]: {
                  state: TicketFace[];
                  setter: Dispatch<SetStateAction<TicketFace[]>>;
              };
          }
        | undefined
    >();

    const onDragEnd: OnDragEndResponder = (result) => {
        const { source, destination } = result;

        if (!destination) return;

        switch (destination.droppableId) {
            case "collections":
                setCollectionsData(
                    () =>
                        rearange(
                            collectionsData as CollectionFace[],
                            source.index,
                            destination.index
                        ) as CollectionFace[]
                );
                orderCollection(
                    source.index,
                    destination.index,
                    domain as string
                );
                break;
            case source.droppableId:
                if (ticketsSetters === undefined) return;

                ticketsSetters[source.droppableId].setter(
                    (prev: TicketFace[]) =>
                        rearange(
                            prev,
                            source.index,
                            destination.index
                        ) as TicketFace[]
                );

                orderTicket(
                    source.index,
                    destination.index,
                    result.source?.droppableId
                );

                break;
            default:
                if (ticketsSetters === undefined) return;

                ticketsSetters[source.droppableId].setter(
                    (prev: TicketFace[]) => {
                        return prev.filter(
                            (ticket) =>
                                ticket.ticketID !==
                                result.draggableId.split("/")[3]
                        );
                    }
                );

                ticketsSetters[destination.droppableId].setter(
                    (prev: TicketFace[]) => {
                        const prevCopy = [...prev];

                        prevCopy.splice(
                            destination.index,
                            0,
                            ticketsSetters[source.droppableId].state.filter(
                                (ticket) =>
                                    ticket.ticketID ===
                                    result.draggableId.split("/")[3]
                            )[0]
                        );

                        return prevCopy;
                    }
                );

                toAnotherCollection(
                    source,
                    destination,
                    result.draggableId.split("/")[3]
                );
                break;
        }
    };

    return (
        <>
            {collectionsData === undefined && (
                <div className="p-12 ">
                    <Loader />
                </div>
            )}

            {collectionsData !== undefined && (
                <div className="h-full flex flex-col">
                    <BreadCrumbs />
                    <div className="flex flex-1 gap-2 items-start md:px-12 px-6 md:pb-12 md:pt-0 py-6 overflow-x-auto overflow-y-hidden w-full h-full">
                        <DragDropContext onDragEnd={onDragEnd}>
                            <Droppable
                                droppableId="collections"
                                type="droppableItem"
                                direction="horizontal"
                            >
                                {({ innerRef, placeholder }) => (
                                    <div
                                        className="inline-flex relative h-full gap-4 "
                                        ref={innerRef}
                                    >
                                        {(
                                            collectionsData as CollectionFace[]
                                        )?.map(
                                            (collection: CollectionFace) =>
                                                collection !== undefined && (
                                                    <TicketList
                                                        collectionInfo={
                                                            collection
                                                        }
                                                        key={
                                                            collection.collectionID
                                                        }
                                                        setTicketsSetters={
                                                            setTicketsSetters
                                                        }
                                                    />
                                                )
                                        )}

                                        {placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                        {isActive ? (
                            <AddCategoryDialog
                                collectionsData={collectionsData}
                                domain={domain}
                            />
                        ) : (
                            <Button
                                rounded
                                onClickFun={() => toggleDialog(isActive)}
                                addonStyle="dark:text-stone-200"
                            >
                                + add category
                            </Button>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};
