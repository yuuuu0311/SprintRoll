import { useState } from "react";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";
import { Droppable } from "react-beautiful-dnd";
// components

// hook
import { useAllTickets } from "@/utilities/hook";

export const SprintPanel: React.FC<{ sprintInfo: object; index: number }> = ({
    sprintInfo,
    index,
}) => {
    const [isToggle, setIsToggle] = useState(true);
    const { isTicketLoading, sprintTickets } = useAllTickets(index);

    // style
    const wrapperClass = twMerge(classNames("bg-white w-full px-6 py-4"));
    const ticketsWrapClass = twMerge(
        classNames("transition overflow-hidden h-0", {
            "h-auto": isToggle,
        })
    );

    return (
        <Droppable droppableId={`sprintTickets-${index}`} type="droppableItem">
            {({ innerRef, placeholder }) => (
                <div className={wrapperClass}>
                    <div>{sprintInfo.name}</div>
                    <div className={ticketsWrapClass} ref={innerRef}>
                        <div>
                            {isTicketLoading && <div>Loading</div>}
                            {sprintTickets.map((ticket) => (
                                <div key={ticket.ticketID}>{ticket.title}</div>
                            ))}
                        </div>
                        {placeholder}
                    </div>
                    <div
                        onClick={() =>
                            setIsToggle((prev) => (prev ? false : true))
                        }
                    >
                        toggle
                    </div>
                </div>
            )}
        </Droppable>

        // <div className={wrapperClass}>
        //     <div>{sprintInfo.name}</div>
        //     <Droppable droppableId="sprintTickets" type="droppableItem">
        //         {({ innerRef, placeholder }) => (
        //             <div className={ticketsWrapClass} ref={innerRef}>
        //                 <div>ticketsWrap</div>
        //                 {placeholder}
        //             </div>
        //         )}
        //     </Droppable>

        //     <div onClick={() => setIsToggle((prev) => (prev ? false : true))}>
        //         toggle
        //     </div>
        // </div>
    );
};
