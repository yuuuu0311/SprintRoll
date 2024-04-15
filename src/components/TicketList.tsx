import { Dispatch, SetStateAction, useState } from "react";

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
    setCollection: Dispatch<SetStateAction<CollectionFace[]>>;
    children: React.ReactNode;
}> = ({ collectionInfo, children, setCollection }) => {
    const [dialogActive, setDialogActive] = useState(false);
    const [newTickInfo, setNewTickInfo] = useState(() => ({
        title: "",
        description: "",
    }));

    const handleAddTicket = () => {
        setCollection((prev) => {
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
    const ticketListClass = classNames(
        twMerge("flex flex-col bg-blue-300 p-4")
    );
    const ticketsClass = classNames(twMerge("w-48 flex flex-col gap-2"));
    const btnClass = classNames(
        twMerge("bg-blue-400 mt-2 p-2 active:bg-blue-500 transition")
    );

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

                                    <button
                                        type="button"
                                        className={btnClass}
                                        onClick={handleDialogToggle}
                                    >
                                        + add ticket
                                    </button>
                                </div>
                            )}
                        </Droppable>
                    </div>
                )}
            </Draggable>

            {dialogActive && (
                <Dialog handleDialogToggle={handleDialogToggle}>
                    dialog content
                    <div>
                        <div>
                            <label htmlFor=""></label>
                            <input type="text" name="" id="" />
                        </div>
                    </div>
                    <div>
                        <Button link onClickFun={handleDialogToggle}>
                            close
                        </Button>
                        <Button link primary onClickFun={handleAddTicket}>
                            add
                        </Button>
                    </div>
                </Dialog>
            )}
        </>
    );
};
