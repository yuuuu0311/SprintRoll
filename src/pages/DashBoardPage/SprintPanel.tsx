import { useState } from "react";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";
import { Droppable } from "react-beautiful-dnd";
// icons

// hook
import { useAllTickets } from "@/utilities/hook";

export const SprintPanel: React.FC<{
    sprintInfo: {
        name?: string;
    };
    index: number;
}> = ({ sprintInfo, index }) => {
    const [isToggle, setIsToggle] = useState(true);
    const { isTicketLoading, sprintTickets } = useAllTickets(index);

    // style
    const ticketsWrapClass = twMerge(
        classNames("transition overflow-hidden p-1 h-0", {
            "h-auto": isToggle,
        })
    );

    return (
        <div>
            <Droppable
                droppableId={`sprintTickets-${index}`}
                type="droppableItem"
            >
                {({ innerRef, placeholder }) => (
                    <div>
                        <div className="bg-neutral-100 w-full px-6 pt-4 flex flex-col gap-3 ">
                            <div className="text-neutral-900 flex gap-2 items-baseline">
                                <div className="font-bold text-3xl">Sprint</div>
                                <span className="text-xl">#{index}</span>
                            </div>
                            <div className="text-neutral-500">
                                {sprintInfo.name}
                            </div>
                            <div className={ticketsWrapClass} ref={innerRef}>
                                <div>
                                    {isTicketLoading && <div>Loading</div>}
                                    {sprintTickets.map((ticket) => (
                                        <div key={ticket.ticketID}>
                                            {ticket.title}
                                        </div>
                                    ))}
                                </div>
                                {placeholder}
                            </div>
                        </div>
                        <div
                            onClick={() =>
                                setIsToggle((prev) => (prev ? false : true))
                            }
                            className="flex justify-center transition bg-neutral-100 hover:bg-neutral-200 py-2 text-neutral-400"
                        >
                            {isToggle ? "less" : "more"}
                        </div>
                    </div>
                )}
            </Droppable>
        </div>
    );
};
