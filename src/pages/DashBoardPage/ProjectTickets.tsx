import "rsuite/DateRangePicker/styles/index.css";

// dependency
import { Droppable } from "react-beautiful-dnd";

// components
import { Ticket } from "@/components/Ticket";
import { Loader } from "@/components/Loader";

import { TicketFace } from "@/interface";

export const ProjectTickets: React.FC<{ allTickets: TicketFace[] }> = ({
    allTickets,
}) => {
    return (
        <div className="flex flex-col gap-3 p-4 rounded-md md:w-56 bg-neutral-200 shadow-lg md:h-full h-1/3">
            <div className="font-bold text-neutral-800">Product Backlog</div>

            {allTickets === undefined && (
                <div className="py-2 h-24">
                    <Loader addonStyle="py-2" />
                </div>
            )}

            <Droppable droppableId="collections" type="droppableItem">
                {({ innerRef, placeholder }) => (
                    <>
                        <div
                            className="flex flex-col gap-3 overflow-auto flex-1 no-scrollbar"
                            ref={innerRef}
                        >
                            {allTickets?.map((ticket, index) => (
                                <Ticket
                                    key={ticket.ticketID}
                                    ticketInfo={ticket}
                                    index={index}
                                    isInCollection={ticket.collectionID}
                                />
                            ))}
                        </div>

                        {placeholder}
                    </>
                )}
            </Droppable>
        </div>
    );
};
