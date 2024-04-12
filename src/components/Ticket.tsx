// dependency
import { Draggable } from "react-beautiful-dnd";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";

// interface
import { TicketFace } from "@/interface";

export const Ticket: React.FC<{
    ticketInfo: TicketFace;
    collectionId: number;
    index: number;
}> = ({ ticketInfo, collectionId, index }) => {
    const ticketsClass = classNames(twMerge("p-2 bg-gray-700"));

    return (
        <Draggable
            index={index}
            draggableId={`ticket-${index}-in-collection-${collectionId}`}
        >
            {({ innerRef, draggableProps, dragHandleProps }) => (
                <div
                    ref={innerRef}
                    className={ticketsClass}
                    {...draggableProps}
                    {...dragHandleProps}
                >
                    {ticketInfo.name}
                </div>
            )}
        </Draggable>
    );
};
