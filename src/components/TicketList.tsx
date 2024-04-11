// dependency

import { Dispatch, SetStateAction } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";

import { TicketFace } from "@/interface";

interface TicketListProps {
    cateInfo: {
        id: number;
        name: string;
    };
    index: number;
    children: React.ReactNode;
    setItems: Dispatch<SetStateAction<TicketFace[]>>;
}

export const TicketList: React.FC<TicketListProps> = ({
    cateInfo,
    index,
    children,
    setItems,
}) => {
    const handleAddTicket = (cate: number) => {
        setItems((prev) => [
            ...prev,
            {
                id: prev.length + 1,
                name: `item${prev.length + 1}`,
                category: cate,
            },
        ]);
    };

    return (
        <Draggable
            draggableId={`category-${cateInfo.id}`}
            key={`category-${cateInfo.id}`}
            index={index}
        >
            {({ innerRef, draggableProps, dragHandleProps }) => (
                <div ref={innerRef} {...draggableProps} {...dragHandleProps}>
                    <Droppable droppableId={cateInfo.id.toString()}>
                        {({ innerRef, droppableProps, placeholder }) => (
                            <div
                                className="flex flex-col"
                                ref={innerRef}
                                {...droppableProps}
                            >
                                <h3 className="mb-3">{cateInfo.name}</h3>

                                <div className="border-2 border-solid border-white w-48">
                                    <div>{children}</div>
                                    {placeholder}
                                </div>

                                <button
                                    type="button"
                                    onClick={() => handleAddTicket(cateInfo.id)}
                                >
                                    + add ticket
                                </button>
                            </div>
                        )}
                    </Droppable>
                </div>
            )}
        </Draggable>
    );
};
