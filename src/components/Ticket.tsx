import { useState } from "react";

// dependency
import { Draggable } from "react-beautiful-dnd";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";

// interface
import { TicketFace } from "@/interface";

// components
import { Button } from "@/components/Button";
import { Dialog } from "@/components/Dialog";

// utilities
import { deleteTicket } from "@/utilities";

export const Ticket: React.FC<{
    ticketInfo: TicketFace;
    index: number;
    isInCollection?: string;
}> = ({ isInCollection, index, ticketInfo }) => {
    const [dialogActive, setDialogActive] = useState(false);

    const ticketsClass = classNames(
        twMerge("p-2 bg-blue-700 rounded-md hover:bg-blue-500 transition")
    );

    const handleDialogToggle = () => {
        setDialogActive((prev) => (prev ? false : true));
    };

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
                            onClick={handleDialogToggle}
                        >
                            {/* {ticketInfo.ticketID} */}
                            {ticketInfo.title}
                        </div>
                    )}
                </Draggable>
            )}
            {dialogActive && (
                <Dialog
                    handleDialogToggle={handleDialogToggle}
                    title={ticketInfo.title as string}
                >
                    <div className="mb-4">
                        <div>collectionID : {isInCollection}</div>
                        <div>ticketID : {ticketInfo.ticketID}</div>
                    </div>
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
                        delete
                    </Button>
                </Dialog>
            )}
        </>
    );
};
