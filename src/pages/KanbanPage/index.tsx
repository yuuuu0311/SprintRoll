import { useParams } from "react-router-dom";

// dependency
import {
    DragDropContext,
    Droppable,
    OnDragEndResponder,
} from "react-beautiful-dnd";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";

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
import { CollectionFace, DialogState } from "@/interface";

export const KanbanPage: React.FC = () => {
    const { domain } = useParams();
    const { isActive, toggleDialog } = useDialog<DialogState>((state) => state);
    const { isLoading, collectionsData, setCollectionsData } = useCollections(
        domain as string
    );

    const onDragEnd: OnDragEndResponder = (result) => {
        const { source, destination } = result;

        // console.log(source, destination, result);

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
                orderTicket(
                    source.index,
                    destination.index,
                    result.destination?.droppableId
                );
                break;

            default:
                toAnotherCollection(source, destination, result.draggableId);
                break;
        }
    };

    // style
    const wrapperClass = classNames(twMerge("inline-flex gap-4"));

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
                                        className={wrapperClass}
                                        ref={innerRef}
                                    >
                                        {(
                                            collectionsData as CollectionFace[]
                                        )?.map((collection: CollectionFace) => (
                                            <TicketList
                                                collectionInfo={collection}
                                                key={collection.collectionID}
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
