import React, { ChangeEvent, useState } from "react";
import { useParams } from "react-router-dom";

// dependency
import { Droppable, Draggable } from "react-beautiful-dnd";
import { addDoc, collection } from "firebase/firestore";

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
    children?: React.ReactNode;
}> = ({ collectionInfo }) => {
    const { domain } = useParams();
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

        handleDialogToggle();

        const ticketsRef = collection(
            db,
            `collections/${collectionInfo.collectionID}/tickets`
        );
        await addDoc(ticketsRef, {
            ...newTickInfo,
            order: ticketsData.length,
            domain: domain,
        });

        setNewTickInfo(() => ({
            title: "",
            description: "",
            domain: domain,
            assignedDeveloper: [],
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

    return (
        <>
            <Draggable
                draggableId={collectionInfo.collectionID}
                index={collectionInfo.order}
                isDragDisabled={dialogActive}
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
                                        (ticket: TicketFace) => (
                                            <Ticket
                                                key={ticket.ticketID}
                                                ticketInfo={ticket}
                                                index={ticket.order}
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
