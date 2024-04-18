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
import { Layout } from "@/components/Layout.tsx";
import { TicketList } from "@/components/TicketList";
import { Dialog } from "@/components/Dialog";
import { Button } from "@/components/Button";

// utilities
import {
    orderCollection,
    orderTicket,
    toAnotherCollection,
    rearange,
} from "@/utilities";
import { db } from "@/utilities/firebase";
import { useCollections, useTickets } from "@/utilities/hook";

// interface
import { CollectionFace, TicketFace } from "@/interface";

export const KanbanPage: React.FC = () => {
    const { domain } = useParams();
    const { isLoading, collectionsData, setCollectionsData } = useCollections(
        domain as string
    );
    const [lastDroppedDest, setLastDroppedDest] = useState<string>();
    const { ticketsData, setTicketsData } = useTickets(lastDroppedDest);

    const [dialogActive, setDialogActive] = useState(false);
    const [collectionName, setCollectionName] = useState("");

    const onDragEnd: OnDragEndResponder = (result) => {
        const { source, destination } = result;

        console.log(source, destination, result);

        if (!destination) return;

        switch (destination.droppableId) {
            case "collections":
                setCollectionsData(
                    () =>
                        rearange(
                            collectionsData as CollectionFace[],
                            source.index,
                            destination.index
                        ) as CollectionFace[]
                );
                orderCollection(source.index, destination.index);
                break;
            case source.droppableId:
                setLastDroppedDest(source.droppableId);
                setTicketsData(
                    () =>
                        rearange(
                            ticketsData as TicketFace[],
                            source.index,
                            destination.index
                        ) as CollectionFace[]
                );

                orderTicket(
                    source.index,
                    destination.index,
                    result.destination?.droppableId
                );
                break;

            default:
                toAnotherCollection(source, destination, result.draggableId);
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
    const wrapperClass = classNames(twMerge("inline-flex gap-4"));

    // useEffect(() => {
    //     console.log(lastDroppedDest);
    //     console.log(ticketsData);
    // }, [lastDroppedDest, ticketsData]);

    return (
        <Layout>
            {isLoading && <div>is loading</div>}

            {collectionsData !== undefined && (
                <div className="h-full">
                    {domain}'s KanbanPage
                    <div className="flex gap-2 items-start p-12 overflow-x-auto overflow-y-hidden w-full h-full">
                        <DragDropContext onDragEnd={onDragEnd}>
                            <Droppable
                                droppableId="collections"
                                type="droppableItem"
                                direction="horizontal"
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

                                        {placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                        <Button rounded onClickFun={handleDialogToggle}>
                            + add category
                        </Button>
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
        </Layout>
    );
};
