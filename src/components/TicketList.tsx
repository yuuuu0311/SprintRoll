import { ChangeEvent, useState } from "react";

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

// hook and utilities
import { useTickets } from "@/utilities/hook";
import { db } from "@/utilities/firebase";

export const TicketList: React.FC<{
    collectionInfo: CollectionFace;
}> = ({ collectionInfo }) => {
    const { isLoading, ticketsData } = useTickets(collectionInfo.collectionID);

    const [dialogActive, setDialogActive] = useState(false);
    const [newTickInfo, setNewTickInfo] = useState(() => ({
        name: "",
        description: "",
        assignedDeveloper: [],
    }));

    const handleAddTicket: () => void = async () => {
        if (newTickInfo.name === "") return;
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
            name: "",
            description: "",
            assignedDeveloper: [],
        }));
    };

    const handleDialogToggle = () => {
        setDialogActive((prev) => (prev ? false : true));
    };

    // style
    const ticketListClass = twMerge(
        classNames("flex flex-col bg-blue-300 p-4")
    );
    const ticketsClass = twMerge(classNames("w-48 flex flex-col gap-2"));
    const btnClass = twMerge(
        classNames("bg-blue-400 mt-2 p-2 active:bg-blue-500 transition")
    );
    const inputRowClass = twMerge(classNames(`flex gap-2 `));

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
                                    <h3>{collectionInfo.collectionID}</h3>
                                    {/* <h3>{collectionInfo.name}</h3> */}

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
                    <div>
                        <div className={inputRowClass}>
                            <label htmlFor="name">title</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="title goes here"
                                value={newTickInfo.name}
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <div className={inputRowClass}>
                            <label htmlFor="description">description</label>
                            <input
                                type="text"
                                name="description"
                                id="description"
                                placeholder="description"
                                value={newTickInfo.description}
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                    </div>
                    <div>
                        <Button link rounded onClickFun={handleDialogToggle}>
                            close
                        </Button>
                        <Button
                            link
                            primary
                            rounded
                            onClickFun={handleAddTicket}
                        >
                            add
                        </Button>
                    </div>
                </Dialog>
            )}
        </>
    );
};
