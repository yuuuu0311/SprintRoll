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
import { TicketListFace, TicketFace } from "./interface";

// markData
import { markCategories, markItems } from "@/markData";

function App() {
    const [categories, setCategories] =
        useState<TicketListFace[]>(markCategories);
    const [items, setItems] = useState<TicketFace[]>(markItems);

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

    const handleAddCate = () => {
        setCategories((prev) => [
            ...prev,
            {
                id: prev.length + 1,
                name: `Category ${prev.length + 1}`,
            },
        ]);
    };

    useEffect(() => {
        console.log(items);
    }, [items]);

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
                            {categories.map((cateInfo, index) => (
                                <TicketList
                                    cateInfo={cateInfo}
                                    key={`category-${cateInfo.id}`}
                                    index={index}
                                    setItems={setItems}
                                >
                                    {items
                                        .filter(
                                            (itemInfo) =>
                                                itemInfo.category ===
                                                cateInfo.id
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
                            <button type="button" onClick={handleAddCate}>
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
