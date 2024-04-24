import { useState } from "react";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";
import { Droppable } from "react-beautiful-dnd";

// hook
import { useAllTickets } from "@/utilities/hook";

// components
import { TicketStatusRow } from "./TicketStatusRow";
import { TicketFace } from "@/interface";

export const SprintPanel: React.FC<{
    sprintInfo: {
        name?: string;
    };
    index: number;
}> = ({ sprintInfo, index }) => {
    const [isToggle, setIsToggle] = useState(true);

    const { isTicketLoading, sprintTickets } = useAllTickets(index);

    const getProgressPercentage = (sprintTickets: TicketFace[]) => {
        const havingStatus = sprintTickets.filter(
            (ticket) => ticket.status !== -1
        );

        return havingStatus.length === 0 && sprintTickets.length === 0
            ? 0
            : Math.floor((havingStatus.length / sprintTickets.length) * 100);
    };

    const ticketsWrapClass = twMerge(
        classNames("transition-all overflow-y-auto no-scrollbar max-h-0", {
            "max-h-[500px]": isToggle,
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
                        <div className="bg-neutral-100 w-full px-6 pt-4 flex flex-col gap-3 relative">
                            <div className="text-neutral-900 flex gap-2 items-baseline">
                                <div className="font-bold text-3xl text-neutral-600">
                                    Sprint
                                </div>
                                <span className="text-xl">#{index}</span>
                            </div>
                            <div className="flex gap-4 items-center">
                                <div className="flex-1 relative rounded-full overflow-hidden bg-neutral-200  h-3">
                                    {getProgressPercentage(sprintTickets) ? (
                                        <div
                                            className={`animate-pulse transition origin-left bg-lime-500 rounded-full h-full `}
                                            style={{
                                                width: `${getProgressPercentage(
                                                    sprintTickets
                                                )}%`,
                                            }}
                                        ></div>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                                {`${getProgressPercentage(sprintTickets)}%`}
                            </div>
                            <div className="text-neutral-500">
                                {sprintInfo.name}
                            </div>
                            <div className={ticketsWrapClass} ref={innerRef}>
                                <div className="flex flex-col gap-2">
                                    {isTicketLoading && <div>Loading</div>}
                                    {sprintTickets.map((ticket) => (
                                        <TicketStatusRow
                                            ticketInfo={ticket}
                                            key={ticket.ticketID}
                                        />
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
