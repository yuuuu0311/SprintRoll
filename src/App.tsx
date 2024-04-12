import { useEffect, useState } from "react";

import "./App.css";

// dependency
import {
    DragDropContext,
    Droppable,
    OnDragEndResponder,
} from "react-beautiful-dnd";

// components
import { TicketList } from "@/components/TicketList";
import { Ticket } from "@/components/Ticket";

// interface
import { CollectionFace, TicketFace } from "./interface";

// markData
import { markFrontEndData } from "@/markData";

function App() {
    const [collection, setCollection] = useState<CollectionFace[]>(
        () => markFrontEndData.collection
    );

    const rearange: (
        arr: (CollectionFace | TicketFace)[],
        sourceIndex: number,
        destIndex: number
    ) => (CollectionFace | TicketFace)[] = (arr, sourceIndex, destIndex) => {
        const arrCopy = [...arr];
        const [removed] = arrCopy.splice(sourceIndex, 1);
        arrCopy.splice(destIndex, 0, removed);

        return arrCopy;
    };

    const onDragEnd: OnDragEndResponder = (result) => {
        const { source, destination } = result;

        if (!destination) return;

        const isDroppingCollection = destination.droppableId === "collections";
        const isInSameCollection =
            destination.droppableId == source.droppableId;

        if (isDroppingCollection) {
            setCollection((prev) =>
                rearange(prev, source.index, destination.index)
            );
        } else if (isInSameCollection) {
            const collectionIndex = parseInt(source.droppableId);

            setCollection((prev) => {
                const collectionsCopy = [...prev];
                const collectionInfoCopy = { ...prev[collectionIndex] };
                const edited = {
                    ...collectionInfoCopy,
                    tickets: rearange(
                        collectionInfoCopy.tickets,
                        source.index,
                        destination.index
                    ),
                };

                collectionsCopy.splice(collectionIndex, 1, edited);

                return collectionsCopy;
            });
        }
    };

    const handleAddCollection = () => {
        setCollection((prev) => [
            ...prev,
            {
                id: prev.length,
                name: `Collection ${prev.length + 1}`,
                tickets: [],
            },
        ]);
    };

    // const handleAddTicket = (collectionIndex, source, destination) => {
    //     setCollection((prev) => {
    //         const collectionCopy = [...prev];

    //         const [targetCollection] = collectionCopy.splice(
    //             collectionIndex,
    //             1
    //         );

    //         const copy = {
    //             ...targetCollection,
    //             tickets: rearange(
    //                 targetCollection.tickets,
    //                 source.index,
    //                 destination.index
    //             ),
    //         };

    //         collectionCopy.splice(collectionIndex, 0, copy);

    //         return collectionCopy;
    //     });

    // setCollection((prev) => [
    //     ...prev,
    //     {
    //         id: prev.length,
    //         name: `Collection ${prev.length + 1}`,
    //         tickets: [],
    //     },
    // ]);
    // };

    useEffect(() => {
        console.log(collection);
    }, [collection]);

    return (
        <div>
            {/* <TabNavigation></TabNavigation> */}
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="collections" type="droppableItem">
                    {({ innerRef, placeholder }) => (
                        <div
                            className="flex gap-2 p-6 border-2 border-solid border-white"
                            ref={innerRef}
                        >
                            {collection.map((collection, index) => (
                                <TicketList
                                    collectionInfo={collection}
                                    setCollection={setCollection}
                                    index={index}
                                    key={`collection-${collection.id}`}
                                >
                                    {collection.tickets.map((ticket, index) => (
                                        <Ticket
                                            key={`ticket-${ticket.id}`}
                                            ticketInfo={ticket}
                                            collectionId={collection.id}
                                            index={index}
                                        />
                                    ))}
                                </TicketList>
                            ))}
                            <button type="button" onClick={handleAddCollection}>
                                + add category
                            </button>
                            {placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
}

export default App;
