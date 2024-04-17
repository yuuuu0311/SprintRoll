import { useEffect, useState } from "react";

// dependency
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";
import { collection, onSnapshot, getDocs } from "firebase/firestore";

// components
import { Layout } from "@/components/Layout";
import { Ticket } from "@/components/Ticket";

// utilities

import { db } from "@/utilities/firebase";

// // interface
import { TicketFace } from "@/interface";

export const DashBoardPage: React.FC = () => {
    const [allTickets, setAllTickets] = useState<TicketFace[]>([]);

    // style
    const wrapperClass = classNames(
        twMerge("flex flex-col gap-3 p-12 overflow-auto")

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

                const ticketsCopy = ticketsData.docs.map((doc) => ({
                    ...(doc.data() as TicketFace),
                    ticketID: doc.id,
                    isInCollection: doc.id,
                }));

                setAllTickets((prev) => [...prev, ...ticketsCopy]);
            });
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        console.log(allTickets);
    }, [allTickets]);

    return (
        <Layout>
            <DragDropContext onDragEnd={() => console.log("drag end")}>
                <Droppable droppableId="collections" type="droppableItem">
                    {({ innerRef, placeholder }) => (
                        <div className={wrapperClass} ref={innerRef}>
                            {allTickets?.map((ticket, index) => (
                                <Ticket
                                    key={ticket.ticketID}
                                    ticketInfo={ticket}
                                    index={index}
                                    isInCollection={ticket.isInCollection}
                                />
                            ))}
                            {placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </Layout>
    );
};
