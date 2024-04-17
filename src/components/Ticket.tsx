// dependency
import { Draggable } from "react-beautiful-dnd";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";

// interface
import { TicketFace } from "@/interface";

// components
import { Button } from "@/components/Button";

// utilities
import { deleteTicket } from "@/utilities";

export const Ticket: React.FC<{
    ticketInfo: TicketFace;
    index: number;
    isInCollection?: string;
}> = ({ isInCollection, index, ticketInfo }) => {
    const ticketsClass = classNames(twMerge("p-2 bg-gray-700"));

    return (
        <>
            {ticketInfo.ticketID !== undefined && (
                <Draggable index={index} draggableId={ticketInfo.ticketID}>
                    {({ innerRef, draggableProps, dragHandleProps }) => (
                        <div
                            ref={innerRef}
                            className={ticketsClass}
                            {...draggableProps}
                            {...dragHandleProps}
                        >
                            {ticketInfo.ticketID}
                            {/* {ticketInfo.name} */}
                            <Button
                                rounded
                                primary
                                onClickFun={() => {
                                    deleteTicket(
                                        isInCollection as string,
                                        ticketInfo.ticketID as string
                                    );
                                }}
                            >
                                delete me
                            </Button>
                        </div>
                    )}
                </Draggable>
            )}
        </>
    );
};
