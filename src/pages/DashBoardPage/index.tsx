import { useEffect, useState, Dispatch, SetStateAction } from "react";

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
import { toSprint, addSprint } from "@/utilities";
import { useAllTickets, useSprint } from "@/utilities/hook";
import { useDialog } from "@/utilities/store";

// interface
import { DialogState, SprintFace, TicketFace } from "@/interface";
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
    const { isSprintLoading, sprintInfo, setSprintInfo } = useSprint();
    const { isActive, toggleDialog } = useDialog<DialogState>((state) => state);

    const [sprintTicketsSetters, setSprintTicketsSetters] = useState<
        | {
              [key: string]: Dispatch<SetStateAction<TicketFace[]>>;
          }
        | undefined
    >();

    const [newSprintInfo, setNewSprintInfo] = useState<SprintFace>({
        name: "GGGG",
        description: "",

        cycle: [new Date(), undefined],
    });

    const onDragEnd: OnDragEndResponder = (result) => {
        const { source, destination } = result;

        if (!destination) return;

        if (toSprintPanel(destination.droppableId)) {
            if (sprintTicketsSetters === undefined) return;

            const ticketsCopy = [...allTickets];
            const [movedTicket] = ticketsCopy.splice(source.index, 1);
            console.log(movedTicket);

            sprintTicketsSetters[destination.droppableId](
                (prev: TicketFace[]) => {
                    prev.splice(destination.index, 0, movedTicket);

                    return prev.sort(
                        (a: TicketFace, b: TicketFace) =>
                            (a.status as number) - (b.status as number)
                    );
                }
            );

            toSprint(result.draggableId, getSprintNum(destination.droppableId));
        } else {
            console.log(source);
        }
    };

    const handleAddSprint = () => {
        setSprintInfo((prev) => {
            return [
                ...prev,
                {
                    index: sprintInfo.length,
                    ...newSprintInfo,
                },
            ] as SprintFace[];
        });
        addSprint({
            index: sprintInfo.length,
            ...newSprintInfo,
        });
        toggleDialog(isActive);
    };

    useEffect(() => {
        console.log(sprintTicketsSetters);
    }, [sprintTicketsSetters]);

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

                    <div className="flex-1 h-full flex flex-col gap-5">
                        {isSprintLoading && (
                            <div className="w-full h-full grid place-items-center p-6">
                                <Loader />
                            </div>
                        )}
                        <div className="rounded-md max-h-full overflow-y-auto no-scrollbar [&>:not(:last-child)]:border-b-2 [&>:not(:last-child)]:border-b-solid [&>:not(:last-child)]:border-b-neutral-200">
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
                    handleDialogToggle={() => toggleDialog(isActive)}
                    title="add category"
                >
                    <div>
                        <div>sprint cycle</div>
                        <input
                            type="text"
                            placeholder="title"
                            onChange={(e) => {
                                setNewSprintInfo((prev) => ({
                                    ...prev,
                                    name: e.target.value,
                                }));
                            }}
                        />
                    </div>
                    <div>
                        <div>sprint cycle</div>
                        <DateRangePicker
                            // value={newSprintInfo.cycle as [Date, Date]}
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
                    <div>
                        <div>description</div>
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
