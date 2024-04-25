import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";
import { Droppable } from "react-beautiful-dnd";
import { Timestamp } from "firebase/firestore";

// hook
import { useAllTickets } from "@/utilities/hook";

// components
import { TicketStatusRow } from "./TicketStatusRow";
import { SprintFace, TicketFace } from "@/interface";

const getProgressPercentage = (sprintTickets: TicketFace[]) => {
    const havingStatus = sprintTickets.filter((ticket) => ticket.status !== -1);

    return havingStatus.length === 0 && sprintTickets.length === 0
        ? 0
        : Math.floor((havingStatus.length / sprintTickets.length) * 100);
};

const getDateString = (date: Timestamp) =>
    new Date(
        date.seconds * 1000 + date.nanoseconds / 1000000
    ).toLocaleDateString();

export const SprintPanel: React.FC<{
    sprintInfo: SprintFace;
    setSprintTicketsSetters: Dispatch<
        SetStateAction<
            | {
                  [key: string]: {
                      state: TicketFace[];
                      setter: Dispatch<SetStateAction<TicketFace[]>>;
                  };
              }
            | undefined
        >
    >;

    index: number;
}> = ({ sprintInfo, index, setSprintTicketsSetters }) => {
    const [isToggle, setIsToggle] = useState(true);

    const { isTicketLoading, sprintTickets, setSprintTickets } =
        useAllTickets(index);

    const ticketsWrapClass = twMerge(
        classNames("transition-all bg-neutral-100 px-6 overflow-hidden  h-0", {
            "h-auto": isToggle,
        })
    );

    useEffect(() => {
        setSprintTicketsSetters(
            (prev) =>
                ({
                    ...prev,
                    [`sprintTickets-${index}`]: {
                        state: sprintTickets,
                        setter: setSprintTickets,
                    },
                } as {
                    [key: string]: {
                        state: TicketFace[];
                        setter: Dispatch<SetStateAction<TicketFace[]>>;
                    };
                })
        );
    }, [sprintTickets]);

    return (
        <div>
            <Droppable
                droppableId={`sprintTickets-${index}`}
                type="droppableItem"
            >
                {({ innerRef, placeholder }) => (
                    <div>
                        <div className=" sticky top-0 bg-neutral-100 w-full px-6 pt-4 pb-2 flex flex-col gap-3 ">
                            <div className="text-neutral-600 flex flex-col gap-1">
                                <div className="flex justify-between items-baseline">
                                    <div className="font-bold text-3xl">
                                        {sprintInfo.name}
                                    </div>
                                    <span className="text-sm">
                                        # Sprint {index}
                                    </span>
                                </div>
                                <div className="flex justify-between items-baseline text-sm text-neutral-500">
                                    <span className="">
                                        {sprintTickets.length} tickets inside
                                    </span>
                                    <span className=" flex gap-2">
                                        <span>
                                            {getDateString(
                                                sprintInfo.cycle[0] as Timestamp
                                            )}
                                        </span>
                                        -
                                        <span>
                                            {getDateString(
                                                sprintInfo.cycle[1] as Timestamp
                                            )}
                                        </span>
                                    </span>
                                </div>
                            </div>
                            {sprintInfo.description.length === 0 ? (
                                <></>
                            ) : (
                                <div className="text-neutral-500">
                                    {sprintInfo.description}
                                </div>
                            )}

                            <div className="flex gap-4 items-center">
                                <div className="flex-1 relative rounded-full overflow-hidden bg-neutral-200  h-3">
                                    {getProgressPercentage(sprintTickets) ? (
                                        <div
                                            className={`animate-pulse transition-all ease-in-out duration-1000 origin-left bg-lime-500 rounded-full h-full `}
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
                        </div>
                        <div className={ticketsWrapClass} ref={innerRef}>
                            <div className="flex flex-col">
                                {isTicketLoading && <div>Loading</div>}
                                {sprintTickets.length === 0 ? (
                                    <div className="text-neutral-300 text-sm">
                                        It's empty, drop some tickets here
                                    </div>
                                ) : (
                                    sprintTickets.map((ticket, index) => (
                                        <TicketStatusRow
                                            index={index}
                                            ticketInfo={ticket}
                                            key={`${ticket.ticketID}-${ticket.order}`}
                                        />
                                    ))
                                )}
                            </div>
                            {placeholder}
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
