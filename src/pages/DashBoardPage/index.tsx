// import { useEffect, useState } from "react";

// dependency
import {
    DragDropContext,
    Droppable,
    OnDragEndResponder,
} from "react-beautiful-dnd";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";
// import { collection, onSnapshot, getDocs } from "firebase/firestore";

// components
import { Layout } from "@/components/Layout";
import { Ticket } from "@/components/Ticket";
import { SprintPanel } from "./SprintPanel";

// utilities
import { useAllTickets, useSprint } from "@/utilities/hook";
import { toSprint } from "@/utilities";

const toSprintPanel = (droppableId: string) => {
    const sprintIndexRegex = /sprintTickets-[0-9]/;
    return sprintIndexRegex.test(droppableId);
};

const getSprintNum = (droppableId: string) => {
    const splitString = droppableId.split("-");
    const index = splitString[1];

    return parseInt(index);
};

export const DashBoardPage: React.FC = () => {
    const { isLoading, allTickets } = useAllTickets();
    const { isSprintLoading, sprintInfo } = useSprint();
    // style
    const wrapperClass = classNames(
        twMerge(
            "flex flex-col gap-3 p-4 rounded-md w-56 bg-neutral-100 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-slate-700 scrollbar-track-blue-300 h-full overflow-y-auto"
        )
    );

    const onDragEnd: OnDragEndResponder = (result) => {
        const { source, destination } = result;

        if (!destination) return;

        if (toSprintPanel(destination.droppableId)) {
            toSprint(result.draggableId, getSprintNum(destination.droppableId));
        } else {
            console.log(source);
        }
    };

    return (
        <Layout>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="relative flex h-full items-start p-6 gap-6">
                    <Droppable droppableId="collections" type="droppableItem">
                        {({ innerRef, placeholder }) => (
                            <div className={wrapperClass} ref={innerRef}>
                                <div className="font-bold text-neutral-800">
                                    Product Backlog
                                </div>
                                {isLoading && <div>loading</div>}
                                {allTickets?.map((ticket, index) => (
                                    <Ticket
                                        key={ticket.ticketID}
                                        ticketInfo={ticket}
                                        index={index}
                                        isInCollection={ticket.isInCollection}
                                    />
                                ))}
                                {placeholder}
                            </div>
                        )}
                    </Droppable>

                    <div className="flex-1 ">
                        <div className="rounded-md overflow-y-auto h-full [&>:not(:last-child)]:border-b-2 [&>:not(:last-child)]:border-b-solid [&>:not(:last-child)]:border-b-neutral-200">
                            {isSprintLoading && <div>loading</div>}

                            {sprintInfo.map((sprint: object, index: number) => (
                                <SprintPanel
                                    sprintInfo={sprint}
                                    key={index}
                                    index={index}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </DragDropContext>
        </Layout>
    );
};
