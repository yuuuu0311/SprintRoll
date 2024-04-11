import { useEffect, useState } from "react";

import "./App.css";

// dependency
import {
    DragDropContext,
    Droppable,
    OnDragEndResponder,
} from "react-beautiful-dnd";

// markData
// import { getCards, getCols } from "@/markData";

import { TicketList } from "@/components/TicketList";
import { Ticket } from "@/components/Ticket";

// interface
import { TicketListFace, TicketFace } from "./interface";

function App() {
    const [categories, setCategories] = useState<TicketListFace[]>([
        { id: 1, name: "Category 1" },
        { id: 2, name: "Category 2" },
    ]);
    const [items, setItems] = useState<TicketFace[]>([
        { id: 1, name: "item1", category: 1 },
        { id: 2, name: "item2", category: 1 },
        { id: 3, name: "item3", category: 1 },
        { id: 4, name: "item4", category: 2 },
        { id: 5, name: "item5", category: 2 },
        { id: 6, name: "item6", category: 2 },
    ]);

    const rearangeArr: (
        arr: TicketFace[],
        sourceIndex: number,
        destIndex: number
    ) => TicketFace[] = (arr, sourceIndex, destIndex) => {
        console.log(arr);

        const arrCopy = [...arr];
        const [removed] = arrCopy.splice(sourceIndex, 1);
        arrCopy.splice(destIndex, 0, removed);

        return arrCopy;
    };

    const onDragEnd: OnDragEndResponder = (result) => {
        const { source, destination } = result;
        // console.log(result, source, destination);

        if (!destination) {
            return;
        }

        if (destination.droppableId === "Categories") {
            console.log(1);

            // a category was moved
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
            console.log(3);

            // rearange the array if it is in the same category
            setItems(rearangeArr(items, source.index, destination.index));
        }
    };

    useEffect(() => {
        console.log(items);
    }, [items]);

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="Categories" type="droppableItem">
                {({ innerRef, placeholder }) => (
                    <div
                        // className="flex gap-2 p-6 border-2 border-solid border-white"
                        ref={innerRef}
                    >
                        {categories.map((cateInfo, index) => (
                            <TicketList
                                cateInfo={cateInfo}
                                key={`category-${cateInfo.id}`}
                                index={index}
                            >
                                {items
                                    .filter(
                                        (itemInfo) =>
                                            itemInfo.category === cateInfo.id
                                    )
                                    .map((itemInfo, index) => (
                                        <Ticket
                                            key={itemInfo.id}
                                            itemInfo={itemInfo}
                                            index={index}
                                        />
                                    ))}
                            </TicketList>
                        ))}
                        {placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
}

export default App;
