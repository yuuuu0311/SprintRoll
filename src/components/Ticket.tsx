// dependency
import { Draggable } from "react-beautiful-dnd";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";

// interface
import { TicketFace } from "@/interface";

export const Ticket: React.FC<{
    ticketInfo: TicketFace;
}> = ({ ticketInfo }) => {
    const ticketsClass = classNames(twMerge("p-2 bg-gray-700"));

    return (
        <>
            {ticketInfo.ticketID !== undefined && (
                <Draggable
                    index={ticketInfo.order}
                    draggableId={ticketInfo.ticketID}
                >
                    {({ innerRef, draggableProps, dragHandleProps }) => (
                        <div
                            ref={innerRef}
                            className={ticketsClass}
                            {...draggableProps}
                            {...dragHandleProps}
                        >
                            {ticketInfo.ticketID}
                            {/* {ticketInfo.name} */}
                        </div>
                    )}
                </Draggable>
            )}
        </>
    );
};
