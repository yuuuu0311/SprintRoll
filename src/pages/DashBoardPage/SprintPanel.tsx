import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { Timestamp } from "firebase/firestore";
import { useParams } from "react-router-dom";

// hook
import { useAllTickets } from "@/utilities/hook";

// components
import { TicketStatusRow } from "./TicketStatusRow";
import { SprintFace, TicketFace } from "@/interface";
import { Dialog } from "@/components/Dialog";
import { Button } from "@/components/Button";
import { DateRangePicker } from "rsuite";

// icon
import { MdOutlineEdit, MdOutlineDelete } from "react-icons/md";

// utilities
import { handleDeleteSprint, updateSprint } from "@/utilities";

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
    const { project } = useParams();
    const [isToggle, setIsToggle] = useState(true);
    const [dialogActive, setDialogActive] = useState({
        delete: false,
        edit: false,
    });
    const { isTicketLoading, sprintTickets, setSprintTickets } =
        useAllTickets(index);

    const [newSprintInfo, setNewSprintInfo] = useState<SprintFace>({
        index: sprintInfo.index,
        name: sprintInfo.name,
        description: sprintInfo.description,
        cycle: sprintInfo.cycle,
    });

    const handleDialogToggle = (
        type: keyof {
            delete: false;
            edit: false;
        }
    ) => {
        setDialogActive((prev) => ({
            ...prev,
            [type]: !prev[type],
        }));
    };

    const getTicketInnerWrapClass = (isDraggingOver: boolean) => {
        const ticketsWrapClass = twMerge(
            classNames("flex flex-col items-start relative", {
                "gap-2": isDraggingOver,
            })
        );

        return ticketsWrapClass;
    };

    const getTicketWrapClass = (isDraggingOver: boolean) => {
        const ticketsWrapClass = twMerge(
            classNames(
                "transition-all relative mx-6 p-3 overflow-hidden max-h-0 ",
                {
                    "max-h-[1000px] overflow-auto no-scrollbar": isToggle,
                    "bg-neutral-300/50 w-[calc(100% - 3rem)] rounded-md":
                        isDraggingOver,
                }
            )
        );
        return ticketsWrapClass;
    };
    const inputWrapClass = twMerge(classNames("flex flex-col gap-2"));
    const inputTitleClass = twMerge(classNames("rounded w-full py-1 px-2"));
    const inputCycleClass = twMerge(classNames("rounded"));

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
        <div className="relative">
            <div className="transition hover:brightness-95 hover:z-[-0] bg-neutral-100 relative z-1">
                <div className="sticky top-0 bg-stone-100 w-full px-6 pt-4 pb-2 flex flex-col gap-3 z-[1]">
                    <div className="flex justify-end gap-2">
                        <MdOutlineEdit
                            className="text-lg hover:text-lime-500 transition"
                            onClick={() => handleDialogToggle("edit")}
                        />
                        <MdOutlineDelete
                            className="text-lg hover:text-rose-500 transition"
                            onClick={() => handleDialogToggle("delete")}
                        />
                    </div>
                    <div className="text-neutral-600 flex flex-col gap-1">
                        <div className="flex justify-between items-baseline">
                            <div className="font-bold text-3xl flex gap-2 items-center">
                                <span>{sprintInfo.name}</span>
                            </div>
                            <span className="text-sm"># Sprint {index}</span>
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
                        <div className="flex-1 relative rounded-full overflow-hidden bg-neutral-200 h-3">
                            <div
                                className={`animate-pulse transition-all ease-in-out duration-1000 origin-left bg-lime-500 rounded-full h-full `}
                                style={{
                                    width: `${getProgressPercentage(
                                        sprintTickets
                                    )}%`,
                                }}
                            ></div>
                        </div>
                        {`${getProgressPercentage(sprintTickets)}%`}
                    </div>
                </div>
                <Droppable
                    droppableId={`sprintTickets-${index}`}
                    type="droppableItem"
                >
                    {({ innerRef, placeholder }, { isDraggingOver }) => (
                        <div
                            className={getTicketWrapClass(isDraggingOver)}
                            ref={innerRef}
                        >
                            <div
                                className={getTicketInnerWrapClass(
                                    isDraggingOver
                                )}
                            >
                                {isTicketLoading && <div>Loading</div>}
                                {sprintTickets.length === 0 ? (
                                    <div className="text-neutral-300 text-sm">
                                        It's empty, drop some tickets here
                                    </div>
                                ) : (
                                    sprintTickets.map((ticket, index) => (
                                        <Draggable
                                            index={index}
                                            key={`${ticket.ticketID}-${ticket.order}`}
                                            draggableId={
                                                ticket.ticketID as string
                                            }
                                        >
                                            {(
                                                {
                                                    innerRef,
                                                    draggableProps,
                                                    dragHandleProps,
                                                },
                                                { isDragging }
                                            ) => (
                                                <TicketStatusRow
                                                    index={index}
                                                    innerRef={innerRef}
                                                    draggableProps={
                                                        draggableProps
                                                    }
                                                    dragHandleProps={
                                                        dragHandleProps
                                                    }
                                                    isDragging={isDragging}
                                                    ticketInfo={ticket}
                                                />
                                            )}
                                        </Draggable>
                                    ))
                                )}

                                {placeholder}
                            </div>
                        </div>
                    )}
                </Droppable>
                <div
                    onClick={() => setIsToggle((prev) => (prev ? false : true))}
                    className="flex justify-center transition hover:bg-neutral-200 py-2 text-neutral-400"
                >
                    {isToggle ? "less" : "more"}
                </div>
            </div>

            {dialogActive.delete && (
                <Dialog
                    handleDialogToggle={() => handleDialogToggle("delete")}
                    danger
                    title="caution"
                >
                    <div className="flex flex-col mb-6 text-neutral-600">
                        <div className="text-lg">
                            Are you sure you want to delete this sprint ?
                        </div>
                        <div>This action can not be undone</div>
                    </div>

                    <div className="flex justify-end gap-2">
                        <Button
                            danger
                            rounded
                            onClickFun={() => {
                                handleDeleteSprint(project, sprintInfo);
                                handleDialogToggle("delete");
                            }}
                        >
                            delete
                        </Button>
                        <Button
                            rounded
                            secondary
                            onClickFun={() => handleDialogToggle("delete")}
                        >
                            Close
                        </Button>
                    </div>
                </Dialog>
            )}

            {dialogActive.edit && (
                <Dialog
                    handleDialogToggle={() => {
                        handleDialogToggle("edit");
                    }}
                    title="add category"
                >
                    <div className="flex flex-col gap-2 mb-6">
                        <div className={inputWrapClass}>
                            <div className="text-neutral-500">title</div>
                            <input
                                type="text"
                                placeholder="title"
                                value={newSprintInfo.name}
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
                            <div className="text-neutral-500">cycle</div>
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
                                className="p-2 bg-white text-neutral-500 rounded appearance-none w-full resize-none bg-transparent focus:bg-neutral-300 outline-none transition "
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
                                handleDialogToggle("edit");
                            }}
                        >
                            close
                        </Button>
                        <Button
                            success
                            rounded
                            onClickFun={() => {
                                updateSprint({
                                    ...newSprintInfo,
                                    id: sprintInfo.id,
                                });
                                handleDialogToggle("edit");
                            }}
                        >
                            save
                        </Button>
                    </div>
                </Dialog>
            )}
        </div>
    );
};
