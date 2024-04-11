import { Draggable } from "react-beautiful-dnd";

import { TicketFace } from "@/interface";

type TicketProps = {
    itemInfo: TicketFace;
    index: number;
};

export const Ticket: React.FC<TicketProps> = ({ itemInfo, index }) => {
    return (
        <Draggable
            key={itemInfo.id}
            draggableId={itemInfo.id.toString()}
            index={index}
        >
            {({ innerRef, draggableProps, dragHandleProps }) => (
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
                    <div>{itemInfo.name}</div>
                </div>
            )}
        </Draggable>
    );
};
