import { useParams } from "react-router-dom";
import { useState, Dispatch, SetStateAction, useEffect } from "react";

// dependency
import {
    DragDropContext,
    Droppable,
    OnDragEndResponder,
} from "react-beautiful-dnd";

// components
import { Layout } from "@/components/Layout.tsx";
import { TicketList } from "@/components/TicketList";
import { AddCategoryDialog } from "./addCategory";
import { Button } from "@/components/Button";

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
    const { isLoading, collectionsData, setCollectionsData } = useCollections(
        domain as string
    );

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
                orderCollection(source.index, destination.index);
                break;
            case source.droppableId:
                if (ticketsSetters === undefined) return;

                ticketsSetters[source.droppableId].setter(
                    (prev: TicketFace[]) =>
                        rearange(prev, source.index, destination.index)
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
                            (ticket) => ticket.ticketID !== result.draggableId
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
                                    ticket.ticketID === result.draggableId
                            )[0]
                        );

                        return prevCopy;
                    }
                );

                toAnotherCollection(source, destination, result.draggableId);
                break;
        }
    };

    return (
        <Layout>
            {isLoading && <div>is loading</div>}

            {collectionsData !== undefined && (
                <div className="h-full">
                    <div className="flex gap-2 items-start p-12 overflow-x-auto overflow-y-hidden w-full h-full">
                        <DragDropContext onDragEnd={onDragEnd}>
                            <Droppable
                                droppableId="collections"
                                type="droppableItem"
                                direction="horizontal"
                            >
                                {({ innerRef, placeholder }) => (
                                    <div
                                        className="inline-flex gap-4"
                                        ref={innerRef}
                                    >
                                        {(
                                            collectionsData as CollectionFace[]
                                        )?.map((collection: CollectionFace) => (
                                            <TicketList
                                                collectionInfo={collection}
                                                key={collection.collectionID}
                                                setTicketsSetters={
                                                    setTicketsSetters
                                                }
                                            />
                                        ))}

                                        {placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                        <Button
                            rounded
                            onClickFun={() => toggleDialog(isActive)}
                        >
                            + add category
                        </Button>
                    </div>
                </div>
            )}

            {isActive && (
                <AddCategoryDialog
                    collectionsData={collectionsData}
                    domain={domain}
                />
            )}
        </Layout>
    );
};
