import React, { ChangeEvent, useState } from "react";
import { useParams } from "react-router-dom";

// dependency
import { addDoc, collection, Timestamp } from "firebase/firestore";

// components
import { Button } from "@/components/Button";

// hook and utilities
import { db } from "@/utilities/firebase";

// icons

export const AddTicketInput: React.FC<{
    collectionID?: string;
    ticketsLength?: number;
}> = ({ ticketsLength, collectionID }) => {
    const { project, domain } = useParams();
    const [addCollectionActive, setAddCollectionActive] = useState(false);
    const [newTickInfo, setNewTickInfo] = useState(() => ({
        title: "",
    }));

    const handleAddTicket: () => void = async () => {
        if (newTickInfo.title === "") return;

        setAddCollectionActive((prev) => !prev);

        const ticketsRef = collection(
            db,
            `collections/${collectionID}/tickets`
        );
        await addDoc(ticketsRef, {
            ...newTickInfo,
            order: ticketsLength,
            domain: domain,
            project: project,
            createdTime: Timestamp.fromDate(new Date()),
            status: -1,
        });

        setNewTickInfo(() => ({
            title: "",
        }));
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTickInfo((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <>
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
                            onChange={(e) => handleChange(e)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") handleAddTicket();
                            }}
                            className="text-md px-3 py-2 w-full rounded-md overflow-hidden leading-none outline-none transition focus:bg-neutral-300 "
                        />
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button
                            rounded
                            secondary
                            onClickFun={() =>
                                setAddCollectionActive((prev) => !prev)
                            }
                        >
                            Close
                        </Button>
                        <Button success rounded onClickFun={handleAddTicket}>
                            Add
                        </Button>
                    </div>
                </div>
            )}

            {!addCollectionActive && (
                <Button
                    rounded
                    link
                    secondary
                    onClickFun={() => setAddCollectionActive((prev) => !prev)}
                    addonStyle="text-left dark:text-stone-200 hover:dark:text-neutral-800"
                >
                    + add ticket
                </Button>
            )}
        </>
    );
};
