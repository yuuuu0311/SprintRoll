import { Draggable } from "react-beautiful-dnd";

import { TicketFace } from "@/interface";

export const Ticket: React.FC<{ ticketInfo: TicketFace; index: number }> = ({
    ticketInfo,
    index,
}) => {
    return (
        <Draggable index={index} draggableId={ticketInfo.id.toString()}>
            {({ innerRef, draggableProps, dragHandleProps }) => (
                <div
                    ref={innerRef}
                    className="flex flex-col bg-gray-700 border-2 border-dashed border-white"
                    style={{
                        ...draggableProps.style,
                        display: "block",
                        margin: "0 8px 8px",
                        userSelect: "none",
                    }}
                    {...draggableProps}
                    {...dragHandleProps}
                >
                    <h3 className="font-bold">filter index : {index}</h3>
                    <h3 className="font-bold">
                        real index : {ticketInfo.id - 1}
                    </h3>
                    <div>{ticketInfo.name}</div>
                </div>
            )}
        </Draggable>
    );
};
