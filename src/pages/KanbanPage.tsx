import { useState } from "react";
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
import { TicketList } from "@/components/TicketList";
import { Ticket } from "@/components/Ticket";

// markData
import { markFrontEndData } from "@/markData";

// utilities
import { rearange, getCollectionIndex } from "@/utilities";

// interface
import { CollectionFace } from "@/interface";

export const KanbanPage: React.FC<{}> = ({}) => {
    const { domain } = useParams();

    const [collection, setCollection] = useState<CollectionFace[]>(
        () => markFrontEndData.collection
    );

    const onDragEnd: OnDragEndResponder = (result) => {
        const { source, destination } = result;

        if (!destination) return;

        const isDroppingCollection = destination.droppableId === "collections";
        const isInSameCollection =
            destination.droppableId == source.droppableId;

        if (isDroppingCollection) {
            setCollection(
                (prev) =>
                    rearange(
                        prev,
                        source.index,
                        destination.index
                    ) as CollectionFace[]
            );
        } else if (isInSameCollection) {
            setCollection((prev) => {
                const collectionsCopy = [...prev];

                const [collectionInfoCopy] = collectionsCopy.filter(
                    (collection) =>
                        collection.id === parseInt(destination.droppableId)
                );

                const edited = {
                    ...collectionInfoCopy,
                    tickets: rearange(
                        collectionInfoCopy.tickets,
                        source.index,
                        destination.index
                    ),
                };

                collectionsCopy.splice(
                    getCollectionIndex(
                        collectionsCopy,
                        destination.droppableId
                    ),
                    1,
                    edited
                );

                return collectionsCopy;
            });
        } else {
            setCollection((prev) => {
                const collectionCopy = [...prev];

                const [isShifting] = collectionCopy[
                    parseInt(source.droppableId)
                ].tickets.splice(source.index, 1);

                collectionCopy[
                    parseInt(destination.droppableId)
                ].tickets.splice(destination.index, 0, isShifting);

                return collectionCopy;
            });
        }
    };

    const handleAddCollection: () => void = () => {
        setCollection((prev) => [
            ...prev,
            {
                id: prev.length,
                name: `Collection ${prev.length + 1}`,
                tickets: [],
            },
        ]);
    };

    // style
    const wrapperClass = classNames(
        twMerge("flex gap-3 p-12 overflow-auto")

        //
    );

    return (
        <div>
            {domain}'s KanbanPage
            <div>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="collections" type="droppableItem">
                        {({ innerRef, placeholder }) => (
                            <div className={wrapperClass} ref={innerRef}>
                                {collection.map((collection, index) => (
                                    <TicketList
                                        collectionInfo={collection}
                                        setCollection={setCollection}
                                        index={index}
                                        key={`collection-${collection.id}`}
                                    >
                                        {collection.tickets.map(
                                            (ticket, index) => (
                                                <Ticket
                                                    key={`ticket-${index}`}
                                                    ticketInfo={ticket}
                                                    collectionId={collection.id}
                                                    index={index}
                                                />
                                            )
                                        )}
                                    </TicketList>
                                ))}
                                <button
                                    type="button"
                                    onClick={handleAddCollection}
                                >
                                    + add category
                                </button>
                                {placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        </div>
    );
};
