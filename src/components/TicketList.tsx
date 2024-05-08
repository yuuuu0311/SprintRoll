import React, { useState, Dispatch, SetStateAction, useEffect } from "react";

// dependency
import { Droppable, Draggable } from "react-beautiful-dnd";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

// interface
import { CollectionFace, TicketFace } from "@/interface";

// components
import { Button } from "@/components/Button";
import { Ticket } from "@/components/Ticket";
import { Dialog } from "@/components/Dialog";
import { AddTicketInput } from "@/components/AddTicketInput";
import { Loader } from "@/components/Loader";

// hook and utilities
import { useTickets } from "@/utilities/hook";
import { db } from "@/utilities/firebase";

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

    const handleDeleteCollection = async (collectionInfo: CollectionFace) => {
        const docRef = doc(db, `collections/${collectionInfo.collectionID}`);
        const ticketsRef = collection(
            db,
            `collections/${collectionInfo.collectionID}/tickets`
        );

        try {
            const snapshot = await getDocs(ticketsRef);
            snapshot.forEach((doc) => {
                deleteDoc(doc.ref);
            });

            await deleteDoc(docRef);
        } catch (error) {
            console.log(error);
        }
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
                        {...draggableProps}
                        {...dragHandleProps}
                    >
                        <Droppable droppableId={collectionInfo.collectionID}>
                            {({ innerRef, droppableProps, placeholder }) => (
                                <div
                                    className="flex max-h-full flex-col gap-3 bg-neutral-200 p-4 rounded-lg w-56 shadow-lg dark:bg-neutral-600"
                                    ref={innerRef}
                                    {...droppableProps}
                                    {...dragHandleProps}
                                >
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-lg text-neutral-700 font-bold capitalize dark:text-stone-200">
                                            {collectionInfo.name}
                                        </h3>
                                        <MdOutlineDelete
                                            className="hover:text-rose-500 transition text-xl cursor-pointer text-neutral-500 dark:text-stone-200"
                                            onClick={handleDialogToggle}
                                        />
                                    </div>

                                    <div className="flex h-full overflow-auto  no-scrollbar flex-col gap-3">
                                        {ticketsData === undefined && (
                                            <Loader />
                                        )}
                                        {(ticketsData as CollectionFace[])?.map(
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

                                    <AddTicketInput
                                        collectionID={
                                            collectionInfo.collectionID
                                        }
                                        ticketsLength={
                                            ticketsData?.length as number
                                        }
                                    />
                                </div>
                            )}
                        </Droppable>
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
                            danger
                            rounded
                            onClickFun={() =>
                                handleDeleteCollection(collectionInfo)
                            }
                        >
                            delete
                        </Button>
                        <Button
                            rounded
                            secondary
                            onClickFun={handleDialogToggle}
                        >
                            Close
                        </Button>
                    </div>
                </Dialog>
            )}
        </>
    );
};
