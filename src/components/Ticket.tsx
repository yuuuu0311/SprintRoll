import { Draggable } from "react-beautiful-dnd";

import { TicketFace } from "@/interface";

export const Ticket: React.FC<{
    ticketInfo: TicketFace;
    collectionId: number;
    index: number;
}> = ({ ticketInfo, collectionId, index }) => {
    return (
        <Draggable
            index={index}
            draggableId={`ticket-${ticketInfo.id}-in-collection-${collectionId}`}
        >
            {({ innerRef, draggableProps, dragHandleProps }) => (
                <div
                    ref={innerRef}
                    className="flex flex-col p-1 bg-gray-700 border-2 border-dashed border-white"
                    {...draggableProps}
                    {...dragHandleProps}
                >
                    <div>{ticketInfo.name}</div>
                </div>
            )}
        </Draggable>
    );
};
