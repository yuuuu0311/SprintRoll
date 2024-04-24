import React, {
    ChangeEvent,
    useState,
    Dispatch,
    SetStateAction,
    useEffect,
} from "react";
import { useParams } from "react-router-dom";

// dependency
import { Droppable, Draggable } from "react-beautiful-dnd";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";

// interface
import { CollectionFace, TicketFace } from "@/interface";

// components
import { Dialog } from "@/components/Dialog";
import { Button } from "@/components/Button";
import { Ticket } from "@/components/Ticket";
import { InputRow } from "@/components/InputRow";

// hook and utilities
import { useTickets } from "@/utilities/hook";
import { db } from "@/utilities/firebase";

enum LabelType {
    BUG = "bug",
    FEATURE = "feature",
    REFACTOR = "refactor",
    ASAP = "ASAP",
}

const LabelTypeArray = [
    LabelType.BUG,
    LabelType.FEATURE,
    LabelType.REFACTOR,
    LabelType.ASAP,
];

export const Label: React.FC<{
    labelName: string;
    changeHandler: Dispatch<SetStateAction<TicketFace>>;
}> = ({ labelName, changeHandler }) => {
    const labelClass = twMerge(
        classNames(
            `transition bg-neutral-400 rounded-full py-1 px-3  [&:has(input:checked)]:bg-lime-500 `
        )
    );

    return (
        <label htmlFor={labelName} className={labelClass}>
            <span>{labelName}</span>
            <input
                type="checkbox"
                name={labelName}
                id={labelName}
                hidden
                onChange={(e) =>
                    changeHandler((prev) => ({
                        ...prev,
                        label: {
                            ...prev.label,
                            [e.target.name]: e.target.checked,
                        },
                    }))
                }
            />
        </label>
    );
};

export const TicketList: React.FC<{
    collectionInfo: CollectionFace;
    setTicketsSetters: Dispatch<
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
}> = ({ collectionInfo, setTicketsSetters }) => {
    const { domain } = useParams();
    const { isLoading, ticketsData, setTicketsData } = useTickets(
        collectionInfo.collectionID
    );

    const [dialogActive, setDialogActive] = useState(false);
    const [newTickInfo, setNewTickInfo] = useState(() => ({
        title: "",
        description: "",
        assignedDeveloper: [],
        label: {},
    }));

    const handleAddTicket: () => void = async () => {
        if (newTickInfo.title === "") return;
        if (ticketsData === undefined) return;

        handleDialogToggle();

        const ticketsRef = collection(
            db,
            `collections/${collectionInfo.collectionID}/tickets`
        );
        await addDoc(ticketsRef, {
            ...newTickInfo,
            order: ticketsData.length,
            domain: domain,
            createdTime: Timestamp.fromDate(new Date()),
        });

        setNewTickInfo(() => ({
            title: "",
            description: "",
            domain: domain,
            assignedDeveloper: [],
            label: {},
        }));
    };

    const handleDialogToggle = () => {
        setDialogActive((prev) => (prev ? false : true));
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTickInfo((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    useEffect(() => {
        if (setTicketsSetters === undefined) return;

        setTicketsSetters((prev) => ({
            ...prev,
            [collectionInfo.collectionID]: {
                state: ticketsData,
                setter: setTicketsData,
            } as {
                state: TicketFace[];
                setter: Dispatch<SetStateAction<TicketFace[]>>;
            },
        }));
    }, [ticketsData]);

    return (
        <>
            <Draggable
                draggableId={collectionInfo.collectionID}
                index={collectionInfo.order}
            >
                {({ innerRef, draggableProps, dragHandleProps }) => (
                    <div
                        ref={innerRef}
                        {...draggableProps}
                        {...dragHandleProps}
                    >
                        <Droppable droppableId={collectionInfo.collectionID}>
                            {({ innerRef, droppableProps, placeholder }) => (
                                <div
                                    className="flex flex-col gap-2 bg-neutral-200 p-4 rounded-lg w-56"
                                    ref={innerRef}
                                    {...droppableProps}
                                    {...dragHandleProps}
                                >
                                    <h3 className="text-lg text-neutral-700 font-bold capitalize">
                                        {collectionInfo.name}
                                    </h3>

                                    {isLoading && <div>is loading</div>}
                                    {(ticketsData as CollectionFace[])?.map(
                                        (ticket: TicketFace, index: number) => (
                                            <Ticket
                                                key={ticket.ticketID}
                                                ticketInfo={ticket}
                                                index={index}
                                                isInCollection={
                                                    collectionInfo.collectionID
                                                }
                                            />
                                        )
                                    )}

                                    {placeholder}

                                    <Button
                                        rounded
                                        link
                                        secondary
                                        onClickFun={handleDialogToggle}
                                        addonStyle="text-left"
                                    >
                                        + add ticket
                                    </Button>
                                </div>
                            )}
                        </Droppable>
                    </div>
                )}
            </Draggable>

            {dialogActive && (
                <Dialog
                    handleDialogToggle={handleDialogToggle}
                    title="add Ticket"
                >
                    <div className="flex-1 flex flex-col gap-2">
                        <InputRow
                            label="title"
                            value={newTickInfo.title}
                            placeholder="title goes here"
                            changeHandler={(e) => handleChange(e)}
                        />

                        <div>
                            <div>Date</div>
                            <input type="datetime-local" name="" id="" />
                        </div>
                        <div>
                            <div>Label</div>
                            <div className="flex gap-2 flex-wrap">
                                {LabelTypeArray.map((label) => (
                                    <Label
                                        labelName={label}
                                        key={label}
                                        changeHandler={
                                            setNewTickInfo as Dispatch<
                                                SetStateAction<TicketFace>
                                            >
                                        }
                                    ></Label>
                                ))}
                            </div>
                        </div>
                        <InputRow
                            label="description"
                            value={newTickInfo.description}
                            placeholder="description"
                            changeHandler={(e) => handleChange(e)}
                        />
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button
                            rounded
                            secondary
                            onClickFun={handleDialogToggle}
                        >
                            Close
                        </Button>
                        <Button success rounded onClickFun={handleAddTicket}>
                            Add
                        </Button>
                    </div>
                </Dialog>
            )}
        </>
    );
};
