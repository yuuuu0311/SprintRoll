import "rsuite/DateRangePicker/styles/index.css";

// dependency
import { Droppable } from "react-beautiful-dnd";

// components
import { Ticket } from "@/components/Ticket";
import { Loader } from "@/components/Loader";

import { TicketFace } from "@/interface";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";

export const ProjectTickets: React.FC<{ allTickets: TicketFace[] }> = ({
    allTickets,
}) => {
    const getListWrapClass = (isDraggingOver: boolean) => {
        const classes = twMerge(
            classNames(
                "flex transition-all flex-col gap-3 overflow-auto flex-1 no-scrollbar",
                {
                    "rounded-md p-2 bg-neutral-300/50": isDraggingOver,
                }
            )
        );
        return classes;
    };

    return (
        <div className="flex flex-col gap-3 p-4 rounded-md md:w-56 bg-neutral-200 shadow-lg md:h-full h-1/3">
            <div className="font-bold text-neutral-800">Product Backlog</div>

            {allTickets === undefined && (
                <div className="py-2 h-24">
                    <Loader addonStyle="py-2" />
                </div>
            )}

            <Droppable droppableId="collections" type="droppableItem">
                {({ innerRef, placeholder }, { isDraggingOver }) => (
                    <>
                        <div
                            className={getListWrapClass(isDraggingOver)}
                            ref={innerRef}
                        >
                            {allTickets?.length === 0 ? (
                                <div className="flex flex-1 justify-center items-center px-4 text-sm text-neutral-400 text-center">
                                    Backlog is empty now !
                                </div>
                            ) : (
                                allTickets?.map((ticket, index) => (
                                    <Ticket
                                        key={ticket.ticketID}
                                        ticketInfo={ticket}
                                        index={index}
                                        isInCollection={ticket.collectionID}
                                    />
                                ))
                            )}
                            {placeholder}
                        </div>
                    </>
                )}
            </Droppable>
        </div>
    );
};
