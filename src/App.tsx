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
import { TicketFace, CollectionFace } from "./interface";

// markData
import { markItems, markFrontEndData } from "@/markData";

function App() {
    const [collection, setCollection] = useState<CollectionFace[]>(
        () => markFrontEndData.collection
    );

    console.log(collection);

    // const [categories, setCategories] = useState<TicketListFace[]>(
    //     () => markFrontEndData.collection
    // );
    // const [items, setItems] = useState<TicketFace[]>(markItems);

    const rearangeArr: (
        arr: TicketFace[],
        sourceIndex: number,
        destIndex: number
    ) => TicketFace[] = (arr, sourceIndex, destIndex) => {
        const arrCopy = [...arr];

        const [removed] = arrCopy.splice(sourceIndex, 1);
        // console.log(removed);

        arrCopy.splice(destIndex, 0, removed);

        return arrCopy;
    };

    const onDragEnd: OnDragEndResponder = (result) => {
        const { source, destination } = result;

        if (!destination) {
            return;
        }

        if (destination.droppableId === "Categories") {
            console.log(1);

            setCategories(
                rearangeArr(categories, source.index, destination.index)
            );
        } else if (destination.droppableId !== source.droppableId) {
            console.log(2);

            // find the source in items array and change with destination droppable id
            setItems((prev) =>
                prev.map((item) => {
                    return item.id === parseInt(result.draggableId)
                        ? {
                              ...item,
                              category: parseInt(
                                  result.destination?.droppableId || "0"
                              ),
                          }
                        : item;
                })
            );
        } else {
            setItems((prev) =>
                rearangeArr(prev, source.index, destination.index)
            );
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

    return (
        <div>
            {/* <TabNavigation></TabNavigation> */}
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="Categories" type="droppableItem">
                    {({ innerRef, placeholder }) => (
                        <div
                            className="flex gap-2 p-6 border-2 border-solid border-white"
                            ref={innerRef}
                        >
                            {collection.map((collection, index) => (
                                <TicketList
                                    collectionInfo={collection}
                                    index={index}
                                    key={`collection-${collection.id}`}
                                >
                                    {collection.tickets.map((ticket, index) => (
                                        <Ticket
                                            key={ticket.id}
                                            ticketInfo={ticket}
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
