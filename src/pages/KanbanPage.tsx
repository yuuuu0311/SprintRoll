import { ChangeEvent, useState } from "react";
import { useParams } from "react-router-dom";

// dependency
import {
    DragDropContext,
    Droppable,
    OnDragEndResponder,
} from "react-beautiful-dnd";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";

import { addDoc, collection } from "firebase/firestore";

// components
import { TicketList } from "@/components/TicketList";
import { Dialog } from "@/components/Dialog";
import { Button } from "@/components/Button";

// utilities
import { orderCollection, orderTicket } from "@/utilities";
import { db } from "@/utilities/firebase";
import { useCollections } from "@/utilities/hook";

// interface
import { CollectionFace } from "@/interface";

export const KanbanPage: React.FC = () => {
    const { domain } = useParams();
    const { isLoading, collectionsData } = useCollections(domain as string);

    const [dialogActive, setDialogActive] = useState(false);
    const [collectionName, setCollectionName] = useState("");

    const onDragEnd: OnDragEndResponder = (result) => {
        const { source, destination } = result;

        // console.log(source, destination, result);

        if (!destination) return;

        switch (destination.droppableId) {
            case "collections":
                orderCollection(source.index, destination.index);
                break;
            case source.droppableId:
                orderTicket(
                    source.index,
                    destination.index,
                    result.destination?.droppableId
                );
                break;

            default:
                break;
        }
    };

    const handleAddCollection: () => void = async () => {
        if (collectionName === "") return;
        if (collectionsData === undefined) return;

        const collectionsRef = collection(db, "collections");
        await addDoc(collectionsRef, {
            domain: domain?.toLowerCase(),
            order: collectionsData.length,
            product: "SprintRoll",
            name: collectionName,
        });

        handleDialogToggle();
        setCollectionName("");
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCollectionName(() => e.target.value);
    };

    const handleDialogToggle = () => {
        setDialogActive((prev) => (prev ? false : true));
    };

    // style
    const wrapperClass = classNames(
        twMerge("flex gap-3 p-12 overflow-auto")

        //
    );

    return (
        <>
            {isLoading && <div>is loading</div>}

            {collectionsData !== undefined && (
                <div>
                    {domain}'s KanbanPage
                    <div>
                        <DragDropContext onDragEnd={onDragEnd}>
                            <Droppable
                                droppableId="collections"
                                type="droppableItem"
                            >
                                {({ innerRef, placeholder }) => (
                                    <div
                                        className={wrapperClass}
                                        ref={innerRef}
                                    >
                                        {(
                                            collectionsData as CollectionFace[]
                                        )?.map((collection: CollectionFace) => (
                                            <TicketList
                                                collectionInfo={collection}
                                                key={collection.collectionID}
                                            />
                                        ))}
                                        <button
                                            type="button"
                                            onClick={handleDialogToggle}
                                        >
                                            + add category
                                        </button>
                                        {placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                    </div>
                </div>
            )}

            {dialogActive && (
                <Dialog
                    handleDialogToggle={handleDialogToggle}
                    title="add category"
                >
                    <div>
                        <div>
                            <label htmlFor="name">title</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="title goes here"
                                value={collectionName}
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
                            onClickFun={handleAddCollection}
                        >
                            add
                        </Button>
                    </div>
                </Dialog>
            )}
        </>
    );
};
