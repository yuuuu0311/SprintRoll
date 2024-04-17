import { ChangeEvent, useEffect, useState } from "react";

// dependency
import { Droppable, Draggable } from "react-beautiful-dnd";
import { addDoc, collection } from "firebase/firestore";
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

export const TicketList: React.FC<{
    collectionInfo: CollectionFace;
}> = ({ collectionInfo }) => {
    const { isLoading, ticketsData } = useTickets(collectionInfo.collectionID);

    const [dialogActive, setDialogActive] = useState(false);
    const [newTickInfo, setNewTickInfo] = useState(() => ({
        title: "",
        description: "",
        assignedDeveloper: [],
    }));

    const handleAddTicket: () => void = async () => {
        if (newTickInfo.title === "") return;
        if (ticketsData === undefined) return;

        const ticketsRef = collection(
            db,
            `collections/${collectionInfo.collectionID}/tickets`
        );
        await addDoc(ticketsRef, {
            ...newTickInfo,
            order: ticketsData.length,
        });

        handleDialogToggle();
        setNewTickInfo(() => ({
            title: "",
            description: "",
            assignedDeveloper: [],
        }));
    };

    const handleDialogToggle = () => {
        setDialogActive((prev) => (prev ? false : true));
    };

    // style
    const ticketListClass = twMerge(
        classNames("flex flex-col bg-blue-300 p-4 rounded-lg")
    );
    const ticketsClass = twMerge(classNames("w-48 flex flex-col gap-2 my-2"));
    const btnClass = twMerge(
        classNames("bg-blue-400 mt-2 p-2 active:bg-blue-500 transition")
    );
    const contentClass = twMerge(classNames("flex-1 flex flex-col gap-2"));

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log("change");

        setNewTickInfo((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    useEffect(() => {
        console.log(newTickInfo);
    }, [newTickInfo]);

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
                                    className={ticketListClass}
                                    ref={innerRef}
                                    {...droppableProps}
                                    {...dragHandleProps}
                                >
                                    {/* <h3>{collectionInfo.collectionID}</h3> */}
                                    <h3 className="text-lg">
                                        {collectionInfo.name}
                                    </h3>

                                    <div className={ticketsClass}>
                                        {isLoading && <div>is loading</div>}
                                        {(ticketsData as CollectionFace[])?.map(
                                            (
                                                ticket: TicketFace,
                                                index: number
                                            ) => (
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
                                    </div>

                                    <Button
                                        rounded
                                        onClickFun={handleDialogToggle}
                                        addonStyle={btnClass}
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
                    <div className={contentClass}>
                        <InputRow
                            label="title"
                            value={newTickInfo.title}
                            placeholder="title goes here"
                            changeHandler={(e) => handleChange(e)}
                        />
                        <InputRow
                            label="description"
                            value={newTickInfo.description}
                            placeholder="description"
                            changeHandler={(e) => handleChange(e)}
                        />
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button rounded onClickFun={handleDialogToggle}>
                            Close
                        </Button>
                        <Button primary rounded onClickFun={handleAddTicket}>
                            Add
                        </Button>
                    </div>
                </Dialog>
            )}
        </>
    );
};
