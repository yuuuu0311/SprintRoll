import { Dispatch, SetStateAction, useEffect, useState } from "react";

// dependency
import { Droppable, Draggable } from "react-beautiful-dnd";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";

// interface
import { CollectionFace } from "@/interface";

// components
import { Dialog } from "@/components/Dialog";
import { Button } from "@/components/Button";

export const TicketList: React.FC<{
    collectionInfo: CollectionFace;
    index: number;
    setDomainCollection: Dispatch<SetStateAction<CollectionFace[]>>;
    children: React.ReactNode;
}> = ({ collectionInfo, children, setDomainCollection }) => {
    const [dialogActive, setDialogActive] = useState(false);
    const [newTickInfo, setNewTickInfo] = useState(() => ({
        name: "",
        description: "",
        assignDevelopL: [],
    }));

    const handleAddTicket = () => {
        setDomainCollection((prev) => {
            const collectionsCopy = [...prev];
            const collectionInfoCopy = {
                ...collectionInfo,
                tickets: [
                    ...collectionInfo.tickets,
                    {
                        id: collectionInfo.tickets.length + 1,
                        name: `item${collectionInfo.tickets.length + 1}`,
                    },
                ],
            };

            collectionsCopy.splice(collectionInfo.id, 1, collectionInfoCopy);

            return collectionsCopy;
        });

        setDialogActive(false);
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

    const handleChange = (e) => {
        setNewTickInfo((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <>
            <Draggable
                draggableId={`collection-${collectionInfo.id}`}
                index={collectionInfo.id}
            >
                {({ innerRef, draggableProps, dragHandleProps }) => (
                    <div
                        ref={innerRef}
                        {...draggableProps}
                        {...dragHandleProps}
                    >
                        <Droppable droppableId={collectionInfo.id.toString()}>
                            {({ innerRef, droppableProps, placeholder }) => (
                                <div
                                    className={ticketListClass}
                                    ref={innerRef}
                                    {...droppableProps}
                                    {...dragHandleProps}
                                >
                                    <h3>{collectionInfo.name}</h3>

                                    <div className={ticketsClass}>
                                        {children}
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
