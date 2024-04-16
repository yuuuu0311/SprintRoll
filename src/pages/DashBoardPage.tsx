import { useEffect, useState } from "react";

// // dependency
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";
import { collection, onSnapshot, getDocs } from "firebase/firestore";

// import { addDoc, collection } from "firebase/firestore";

// // components
import { Ticket } from "@/components/Ticket";
// import { Dialog } from "@/components/Dialog";
// import { Button } from "@/components/Button";

// // utilities
// import { orderCollection, orderTicket } from "@/utilities";
import { db } from "@/utilities/firebase";
// import { useCollections } from "@/utilities/hook";

// // interface
// import { CollectionFace } from "@/interface";

export const DashBoardPage: React.FC = () => {
    // const { isLoading, collectionsData } = useCollections(domain as string);

    const [allTickets, setAllTickets] = useState<[]>([]);
    // const [collectionName, setCollectionName] = useState("");

    // style
    const wrapperClass = classNames(
        twMerge("flex gap-3 p-12 overflow-auto")

        //
    );

    useEffect(() => {
        const collectionsRef = collection(db, "collections");
        const getTicketsRef = (id: string) =>
            collection(db, `collections/${id}/tickets`);

        const unsubscribe = onSnapshot(collectionsRef, (collection) => {
            collection.docs.forEach(async (doc) => {
                const ticketsRef = getTicketsRef(doc.id);
                const ticketsData = await getDocs(ticketsRef);

                ticketsData.forEach((doc) =>
                    setAllTickets((prev) => [
                        ...prev,
                        { ...doc.data(), ticketID: doc.id },
                    ])
                );

                // ...doc.data(),
                // collectionID: doc.id,
            });

            // console.log(collectionCopy);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        console.log(allTickets);
    }, [allTickets]);

    return (
        <div>
            <div>
                <DragDropContext onDragEnd={() => console.log("drag end")}>
                    <Droppable droppableId="collections" type="droppableItem">
                        {({ innerRef, placeholder }) => (
                            <div className={wrapperClass} ref={innerRef}>
                                {allTickets.map((ticket) => (
                                    <Ticket ticketInfo={ticket} />
                                ))}
                                {placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        </div>
    );
};
