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
import {
    addDoc,
    collection,
    Timestamp,
    getDocs,
    deleteDoc,
    doc,
} from "firebase/firestore";

// interface
import { CollectionFace, TicketFace } from "@/interface";

// components
import { Button } from "@/components/Button";
import { Ticket } from "@/components/Ticket";
import { Dialog } from "@/components/Dialog";
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
    const { domain } = useParams();
    const { ticketsData, setTicketsData } = useTickets(
        collectionInfo.collectionID
    );

    const [addCollectionActive, setAddCollectionActive] = useState(false);
    const [dialogActive, setDialogActive] = useState(false);
    const [newTickInfo, setNewTickInfo] = useState(() => ({
        title: "",
        // description: "",
        // assignedDeveloper: [],
        // label: {},
    }));

    const handleAddTicket: () => void = async () => {
        if (newTickInfo.title === "") return;
        if (ticketsData === undefined) return;

        setAddCollectionActive((prev) => !prev);

        const ticketsRef = collection(
            db,
            `collections/${collectionInfo.collectionID}/tickets`
        );
        await addDoc(ticketsRef, {
            ...newTickInfo,
            order: ticketsData.length,
            domain: domain,
            createdTime: Timestamp.fromDate(new Date()),
            status: -1,
        });

        setNewTickInfo(() => ({
            title: "",
            // description: "",
            // domain: domain,
            // assignedDeveloper: [],
            // label: {},
        }));
    };

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
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-lg text-neutral-700 font-bold capitalize">
                                            {collectionInfo.name}
                                        </h3>
                                        <MdOutlineDelete
                                            className="hover:text-rose-500 transition text-xl cursor-pointer text-neutral-500"
                                            onClick={handleDialogToggle}
                                        />
                                    </div>

                                    {ticketsData === undefined && <Loader />}
                                    {(ticketsData as CollectionFace[])?.map(
                                        (ticket: TicketFace, index: number) => (
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
                                    {addCollectionActive && (
                                        <div>
                                            <div className="mb-2">
                                                <input
                                                    type="text"
                                                    name="title"
                                                    id="title"
                                                    value={newTickInfo.title}
                                                    placeholder="Ticket Title"
                                                    autoFocus
                                                    onChange={(e) =>
                                                        handleChange(e)
                                                    }
                                                    className="text-md px-3 py-2 w-full rounded-md overflow-hidden leading-none outline-none transition focus:bg-neutral-300 "
                                                />
                                            </div>
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    rounded
                                                    secondary
                                                    onClickFun={() =>
                                                        setAddCollectionActive(
                                                            (prev) => !prev
                                                        )
                                                    }
                                                >
                                                    Close
                                                </Button>
                                                <Button
                                                    success
                                                    rounded
                                                    onClickFun={handleAddTicket}
                                                >
                                                    Add
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                    {placeholder}

                                    {!addCollectionActive && (
                                        <Button
                                            rounded
                                            link
                                            secondary
                                            onClickFun={() =>
                                                setAddCollectionActive(
                                                    (prev) => !prev
                                                )
                                            }
                                            addonStyle="text-left"
                                        >
                                            + add ticket
                                        </Button>
                                    )}
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
