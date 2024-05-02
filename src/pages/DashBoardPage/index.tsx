import { useParams } from "react-router-dom";
import { useState, Dispatch, SetStateAction, useEffect } from "react";

import "rsuite/DateRangePicker/styles/index.css";

// dependency
import {
    DragDropContext,
    Droppable,
    OnDragEndResponder,
} from "react-beautiful-dnd";

// components
import { Ticket } from "@/components/Ticket";
import { Loader } from "@/components/Loader";
import { SprintPanel } from "./SprintPanel";
import { Button } from "@/components/Button";
import { DateRangePicker } from "rsuite";

// utilities
import {
    toSprint,
    addSprint,
    toAnotherSprint,
    resetTicketStatus,
} from "@/utilities";
import { useAllTickets, useSprint } from "@/utilities/hook";
import { useDialog } from "@/utilities/store";

// interface
import { DialogState, SprintFace, TicketFace } from "@/interface";
import { Dialog } from "@/components/Dialog";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";

const toSprintPanel = (droppableId: string) => {
    const sprintIndexRegex = /sprintTickets-[0-9]/;
    return sprintIndexRegex.test(droppableId);
};

const getSprintNum = (droppableId: string) => {
    const splitString = droppableId.split("-");
    const index = splitString[1];

    return parseInt(index);
};

const getMovedTicket = (sourceState: TicketFace[], sourceIndex: number) => {
    const [movedTicket] = sourceState.splice(sourceIndex, 1);
    return movedTicket;
};

export const DashBoardPage: React.FC = () => {
    const { project } = useParams();
    const { allTickets, setAllTickets } = useAllTickets();
    const { isSprintLoading, sprintInfo, setSprintInfo } = useSprint();
    const { isActive, toggleDialog } = useDialog<DialogState>((state) => state);

    const [sprintTicketsSetters, setSprintTicketsSetters] = useState<
        | {
              [key: string]: {
                  state: TicketFace[];
                  setter: Dispatch<SetStateAction<TicketFace[]>>;
              };
          }
        | undefined
    >();

    const [newSprintInfo, setNewSprintInfo] = useState<SprintFace>({
        index: 0,
        name: "",
        description: "",
        cycle: [new Date(), undefined],
    });

    const [sprintInfoError, setSprintInfoError] = useState<{
        name: boolean;
        cycle: boolean;
    }>({
        name: false,
        cycle: false,
    });

    const onDragEnd: OnDragEndResponder = (result) => {
        const { source, destination } = result;

        if (!destination) return;
        if (sprintTicketsSetters === undefined) return;

        // if (backlog to sprint) { }
        // else if (sprint to itself) { }
        // else if (sprint to sprint) { }
        // else { to backlog}

        if (
            source.droppableId === "collections" &&
            toSprintPanel(destination.droppableId)
        ) {
            const ticketsCopy = [...(allTickets as TicketFace[])];

            const [movedTicket] = ticketsCopy.splice(source.index, 1);

            setAllTickets(ticketsCopy);

            sprintTicketsSetters[destination.droppableId].setter(
                (prev: TicketFace[]) => {
                    prev.splice(destination.index, 0, movedTicket);

                    return prev.sort(
                        (a: TicketFace, b: TicketFace) =>
                            (a.status as number) - (b.status as number)
                    );
                }
            );

            toSprint(result.draggableId, getSprintNum(destination.droppableId));
        } else if (source.droppableId === destination.droppableId) {
            console.log("drop on same sprint");

            return;
        } else if (toSprintPanel(destination.droppableId)) {
            const { state: sourceState, setter: sourceSetter } =
                sprintTicketsSetters[source.droppableId];
            const { setter: destSetter } =
                sprintTicketsSetters[destination.droppableId];

            const movedTicket = getMovedTicket(sourceState, source.index);

            sourceSetter((prev) => {
                prev.splice(source.index, 1);

                return prev.sort(
                    (a: TicketFace, b: TicketFace) =>
                        (a.status as number) - (b.status as number)
                );
            });

            destSetter((prev) => {
                prev.splice(destination.index, 0, movedTicket);

                return prev.sort(
                    (a: TicketFace, b: TicketFace) =>
                        (a.status as number) - (b.status as number)
                );
            });

            toAnotherSprint(
                movedTicket.ticketID as string,
                getSprintNum(destination.droppableId)
            );
        } else {
            const { state: sourceState } =
                sprintTicketsSetters[source.droppableId];
            const movedTicket = getMovedTicket(sourceState, source.index);

            setAllTickets((prev) => {
                prev?.splice(destination.index, 0, movedTicket);
                return prev;
            });

            resetTicketStatus(movedTicket.ticketID as string);
        }
    };

    const handleAddSprint = () => {
        // //check
        if (newSprintInfo.name.length === 0) {
            setSprintInfoError((prev) => ({ ...prev, name: true }));
            return;
        }
        if (newSprintInfo.cycle[1] === undefined) {
            setSprintInfoError((prev) => ({ ...prev, cycle: true }));
            return;
        }

        setSprintInfo((prev) => {
            return [
                ...prev,
                {
                    ...newSprintInfo,
                    index: sprintInfo.length,
                },
            ] as SprintFace[];
        });
        addSprint({
            ...newSprintInfo,
            index: sprintInfo.length,
            project: project,
        });

        setNewSprintInfo({
            index: 0,
            name: "",
            description: "",
            cycle: [new Date(), undefined],
        });

        toggleDialog(isActive);
    };

    useEffect(() => {
        setSprintInfoError({
            name: false,
            cycle: false,
        });
    }, [isActive]);

    const inputWrapClass = twMerge(classNames("flex flex-col gap-2"));
    const inputTitleClass = twMerge(
        classNames("rounded w-full py-1 px-2", {
            "outline outline-2 outline-rose-500": sprintInfoError.name,
        })
    );
    const inputCycleClass = twMerge(
        classNames("rounded", {
            "outline outline-2 outline-rose-500": sprintInfoError.name,
        })
    );

    return (
        <>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="relative flex h-full items-start p-6 gap-6">
                    <Droppable droppableId="collections" type="droppableItem">
                        {({ innerRef, placeholder }) => (
                            <div
                                className="flex flex-col gap-3 p-4 rounded-md w-56 no-scrollbar bg-neutral-200  h-full overflow-y-auto shadow-lg"
                                ref={innerRef}
                            >
                                <div className="font-bold text-neutral-800">
                                    Product Backlog
                                </div>
                                {allTickets === undefined && <Loader />}
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

                    <div className="flex-1 h-full flex flex-col gap-7 ">
                        {isSprintLoading && (
                            <div className="w-full h-full grid place-items-center p-6">
                                <Loader />
                            </div>
                        )}
                        <div className="rounded-md max-h-full overflow-y-auto no-scrollbar [&>:not(:last-child)]:border-b-2 [&>:not(:last-child)]:border-b-solid [&>:not(:last-child)]:border-b-neutral-200 shadow-lg">
                            {sprintInfo.length === 0 ? (
                                <div className="text-neutral-400 text-center text-sm">
                                    SprintRoll Your Product now !
                                </div>
                            ) : (
                                sprintInfo.map(
                                    (sprint: object, index: number) => (
                                        <SprintPanel
                                            setSprintTicketsSetters={
                                                setSprintTicketsSetters
                                            }
                                            sprintInfo={sprint as SprintFace}
                                            key={index}
                                            index={index}
                                        />
                                    )
                                )
                            )}
                        </div>
                        <Button
                            rounded
                            addonStyle="hover:bg-neutral-400 hover:text-neutral-600 w-full  bg-neutral-400/50 text-neutral-500 active:bg-neutral-400/50"
                            onClickFun={() => toggleDialog(isActive)}
                        >
                            + sprint
                        </Button>
                    </div>
                </div>
            </DragDropContext>

            {isActive && (
                <Dialog
                    handleDialogToggle={() => {
                        toggleDialog(isActive);
                        setNewSprintInfo({
                            index: 0,
                            name: "",
                            description: "",
                            cycle: [new Date(), undefined],
                        });
                    }}
                    title="add category"
                >
                    <div className="flex flex-col gap-2 mb-6">
                        <div className={inputWrapClass}>
                            <div className="text-neutral-500">
                                <span className="text-rose-500">*</span> title
                            </div>
                            <input
                                type="text"
                                placeholder="title"
                                className={inputTitleClass}
                                onChange={(e) => {
                                    setNewSprintInfo((prev) => ({
                                        ...prev,
                                        name: e.target.value,
                                    }));
                                }}
                            />
                        </div>
                        <div className={inputWrapClass}>
                            <div className="text-neutral-500">
                                <span className="text-rose-500">*</span> cycle
                            </div>
                            <DateRangePicker
                                className={inputCycleClass}
                                onChange={(dateVal) => {
                                    setNewSprintInfo(
                                        (prev) =>
                                            ({
                                                ...prev,
                                                cycle: dateVal,
                                            } as SprintFace)
                                    );
                                }}
                            />
                        </div>
                        <div className={inputWrapClass}>
                            <div className="text-neutral-500">description</div>
                            <textarea
                                className="p-2 text-neutral-500 rounded appearance-none w-full resize-none bg-transparent focus:bg-neutral-300 outline-none transition "
                                placeholder="add some description here"
                                onChange={(e) => {
                                    setNewSprintInfo((prev) => ({
                                        ...prev,
                                        description: e.target.value,
                                    }));
                                }}
                                defaultValue={newSprintInfo.description}
                            ></textarea>
                        </div>
                    </div>
                    <div className="flex gap-2 justify-end mt-auto">
                        <Button
                            secondary
                            rounded
                            onClickFun={() => {
                                toggleDialog(isActive);
                                setNewSprintInfo({
                                    index: 0,
                                    name: "",
                                    description: "",
                                    cycle: [new Date(), undefined],
                                });
                            }}
                        >
                            close
                        </Button>
                        <Button success rounded onClickFun={handleAddSprint}>
                            add
                        </Button>
                    </div>
                </Dialog>
            )}
        </>
    );
};
