import { useState } from "react";

import "./App.css";

// dependency
import {
    DragDropContext,
    Droppable,
    Draggable,
    OnDragEndResponder,
} from "react-beautiful-dnd";

// markData
import { getCards, getCols } from "@/markData";

const Section = ({ children, col }) => {
    return (
        <Droppable droppableId={col.id} type="droppableItem">
            {({ innerRef, droppableProps, placeholder }) => (
                <section
                    ref={innerRef}
                    {...droppableProps}
                    className="border-2 border-solid border-white w-48"
                >
                    <div>{children}</div>
                    {placeholder}
                </section>
            )}
        </Droppable>
    );
};

const Cube = ({ children }) => {
    return <div>{children}</div>;
};

function App() {
    const [cols, setCols] = useState(getCols(2));
    const [cards, setCards] = useState(getCards(10));

    const onDragEnd: OnDragEndResponder = ({ source, destination }) => {
        if (!destination) return;
        const copiedCards = [...cards];
        const [draggedCard] = copiedCards.splice(source.index, 1);
        copiedCards.splice(destination.index, 0, draggedCard);
        setCards(
            copiedCards.map((card, index) => ({ ...card, sortOrder: index }))
        );
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex gap-2">
                {cols.map((col, index) => (
                    <Section col={col}>
                        {cards.map((card) => (
                            <Draggable
                                key={card.id}
                                draggableId={`${card.id}`}
                                index={card.sortOrder}
                            >
                                {({
                                    innerRef,
                                    draggableProps,
                                    dragHandleProps,
                                }) => (
                                    <div
                                        ref={innerRef}
                                        className="h-12 bg-red-500 border-2 border-dashed border-white"
                                        style={{
                                            ...draggableProps.style,
                                            display: "block",
                                            margin: "0 8px 8px",
                                            userSelect: "none",
                                        }}
                                        {...draggableProps}
                                        {...dragHandleProps}
                                    >
                                        <Cube>{card.title}</Cube>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                    </Section>
                ))}
            </div>
        </DragDropContext>
    );
}

export default App;
