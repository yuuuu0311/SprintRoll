// import { useEffect, useState } from "react";

import "rsuite/DateRangePicker/styles/index.css";

// dependency
import {
    DragDropContext,
    Droppable,
    OnDragEndResponder,
} from "react-beautiful-dnd";

// components
import { Ticket } from "@/components/Ticket";
import { Layout } from "@/components/Layout";
import { Loader } from "@/components/Loader";
import { SprintPanel } from "./SprintPanel";
import { Button } from "@/components/Button";
import { DateRangePicker } from "rsuite";

// utilities
import { toSprint } from "@/utilities";
import { useAllTickets, useSprint } from "@/utilities/hook";
import { useDialog } from "@/utilities/store";

// interface
import { DialogState } from "@/interface";
import { Dialog } from "@/components/Dialog";

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
    const { isActive, toggleDialog } = useDialog<DialogState>((state) => state);

    const onDragEnd: OnDragEndResponder = (result) => {
        const { source, destination } = result;

        if (!destination) return;

        if (toSprintPanel(destination.droppableId)) {
            toSprint(result.draggableId, getSprintNum(destination.droppableId));
        } else {
            console.log(source);
        }
    };

    const handleAddSprint = () => {
        console.log(sprintInfo);
    };

    return (
        <Layout>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="relative flex h-full items-start p-6 gap-6">
                    <Droppable droppableId="collections" type="droppableItem">
                        {({ innerRef, placeholder }) => (
                            <div
                                className="flex flex-col gap-3 p-4 rounded-md w-56 bg-neutral-200 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-slate-700 scrollbar-track-blue-300 h-full overflow-y-auto"
                                ref={innerRef}
                            >
                                <div className="font-bold text-neutral-800">
                                    Product Backlog
                                </div>
                                {isLoading && <Loader />}
                                {allTickets?.map((ticket, index) => (
                                    <Ticket
                                        key={ticket.ticketID}
                                        ticketInfo={ticket}
                                        index={index}
                                        isInCollection={ticket.collectionID}
                                    />
                                ))}
                                {placeholder}
                            </div>
                        )}
                    </Droppable>

                    <div className="flex-1 ">
                        {isSprintLoading && (
                            <div className="w-full h-full grid place-items-center p-6">
                                <Loader />
                            </div>
                        )}
                        <div className="rounded-md overflow-y-auto h-full [&>:not(:last-child)]:border-b-2 [&>:not(:last-child)]:border-b-solid [&>:not(:last-child)]:border-b-neutral-200">
                            {sprintInfo.map((sprint: object, index: number) => (
                                <SprintPanel
                                    sprintInfo={sprint}
                                    key={index}
                                    index={index}
                                />
                            ))}
                        </div>
                        <Button
                            rounded
                            addonStyle="hover:bg-neutral-400 hover:text-neutral-600 w-full mt-5 bg-neutral-400/50 text-neutral-500 active:bg-neutral-400/50"
                            onClickFun={() => toggleDialog(isActive)}
                        >
                            + sprint
                        </Button>
                    </div>
                </div>
            </DragDropContext>

            {isActive && (
                <Dialog
                    handleDialogToggle={() => toggleDialog(isActive)}
                    title="add category"
                >
                    <div>
                        <div>sprint cycle</div>
                        <DateRangePicker />
                    </div>
                    <div>
                        <div>description</div>
                        <textarea
                            className="p-2 text-neutral-500 rounded appearance-none w-full resize-none bg-transparent focus:bg-neutral-300 outline-none transition "
                            placeholder="add some description here"
                            // onChange={(e) => {
                            //     handleTextAreaChange(e, ticketInfo);
                            // }}
                            // defaultValue={ticketInfo.description}
                        ></textarea>
                    </div>

                    <div className="flex gap-2 justify-end mt-auto">
                        <Button
                            secondary
                            rounded
                            onClickFun={() => toggleDialog(isActive)}
                        >
                            close
                        </Button>
                        <Button success rounded onClickFun={handleAddSprint}>
                            add
                        </Button>
                    </div>
                </Dialog>
            )}
        </Layout>
    );
};
