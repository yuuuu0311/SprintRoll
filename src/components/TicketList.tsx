import React, { useState, Dispatch, SetStateAction, useEffect } from "react";

// dependency
import { Droppable, Draggable } from "react-beautiful-dnd";

// interface
import { CollectionFace, TicketFace } from "@/interface";

// components
import { Button } from "@/components/Button";
import { Ticket } from "@/components/Ticket";
import { Dialog } from "@/components/Dialog";
import { AddTicketInput } from "@/components/AddTicketInput";
import { Loader } from "@/components/Loader";

// hook and utilities
import { deleteCollection } from "@/utilities";
import { useTickets } from "@/utilities/hook";

// icons
import { MdOutlineDelete } from "react-icons/md";

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
    const { ticketsData, setTicketsData } = useTickets(
        collectionInfo.collectionID
    );

    const [dialogActive, setDialogActive] = useState(false);

    const handleDeleteCollection = () => {
        deleteCollection(collectionInfo);
    };

    const handleDialogToggle = () => {
        setDialogActive((prev) => (prev ? false : true));
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
                        // className="h-fit"
                        {...draggableProps}
                        {...dragHandleProps}
                    >
                        <div className="p-4 bg-neutral-200 max-h-full rounded-lg w-56 shadow-lg flex flex-col">
                            <div className="flex justify-between items-center mb-3">
                                <h3 className="text-lg text-neutral-700 font-bold capitalize">
                                    {collectionInfo.name}
                                </h3>
                                <MdOutlineDelete
                                    className="hover:text-rose-500 transition text-xl cursor-pointer text-neutral-500"
                                    onClick={handleDialogToggle}
                                />
                            </div>
                            <Droppable
                                droppableId={collectionInfo.collectionID}
                            >
                                {(
                                    { innerRef, droppableProps, placeholder },
                                    { isDraggingOver }
                                ) => (
                                    <div
                                        className="flex max-h-full flex-col gap-3 flex-1 overflow-auto  no-scrollbar "
                                        ref={innerRef}
                                        {...droppableProps}
                                        {...dragHandleProps}
                                    >
                                        <div
                                            className={`flex h-full flex-col gap-3 transition-all ${
                                                isDraggingOver &&
                                                "bg-neutral-300/50 p-2 rounded-md"
                                            }`}
                                        >
                                            {ticketsData === undefined && (
                                                <Loader />
                                            )}
                                            {(
                                                ticketsData as CollectionFace[]
                                            )?.map(
                                                (
                                                    ticket: TicketFace,
                                                    index: number
                                                ) => (
                                                    <Ticket
                                                        ticketInfo={ticket}
                                                        index={index}
                                                        key={ticket.ticketID}
                                                        isInCollection={
                                                            collectionInfo.collectionID
                                                        }
                                                    />
                                                )
                                            )}

                                            {placeholder}
                                        </div>
                                    </div>
                                )}
                            </Droppable>
                            <AddTicketInput
                                collectionID={collectionInfo.collectionID}
                                ticketsLength={ticketsData?.length as number}
                            />
                        </div>
                    </div>
                )}
            </Draggable>

            {dialogActive && (
                <Dialog
                    handleDialogToggle={handleDialogToggle}
                    danger
                    title="caution"
                >
                    <div className="flex flex-col mb-6 text-neutral-600">
                        <div className="text-lg">
                            Are you sure you want to delete this collection ?
                        </div>
                        <div>This action can not be undone</div>
                    </div>

                    <div className="flex justify-end gap-2">
                        <Button
                            rounded
                            secondary
                            onClickFun={handleDialogToggle}
                        >
                            Close
                        </Button>
                        <Button
                            danger
                            rounded
                            onClickFun={() => handleDeleteCollection()}
                        >
                            delete
                        </Button>
                    </div>
                </Dialog>
            )}
        </>
    );
};
