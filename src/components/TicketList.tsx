// dependency
import { Droppable, Draggable } from "react-beautiful-dnd";

// import { Dispatch, SetStateAction, useState } from "react";

import { CollectionFace } from "@/interface";

export const TicketList: React.FC<{
    collectionInfo: CollectionFace;
    index: number;
    children: React.ReactNode;
}> = ({ collectionInfo, index, children }) => {
    return (
        <Draggable
            draggableId={`collection-${collectionInfo.id}`}
            index={index}
        >
            {({ innerRef, draggableProps, dragHandleProps }) => (
                <div ref={innerRef} {...draggableProps} {...dragHandleProps}>
                    <Droppable droppableId={collectionInfo.id.toString()}>
                        {({ innerRef, droppableProps, placeholder }) => (
                            <div
                                className="flex flex-col"
                                ref={innerRef}
                                {...droppableProps}
                                {...dragHandleProps}
                            >
                                <h3 className="mb-3">{collectionInfo.name}</h3>

                                <div className="border-2 border-solid border-white w-48">
                                    <div>{children}</div>
                                    {placeholder}
                                </div>

                                {/* <button
                                    type="button"
                                    onClick={() => handleAddTicket(cateInfo.id)}
                                >
                                    + add ticket
                                </button> */}
                            </div>
                        )}
                    </Droppable>
                </div>
            )}
        </Draggable>
    );
};
