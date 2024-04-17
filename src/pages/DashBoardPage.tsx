import { useEffect, useState } from "react";

// dependency
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { twMerge } from "tailwind-merge";
import classNames from "classnames";
// import { collection, onSnapshot, getDocs } from "firebase/firestore";

// components
import { Layout } from "@/components/Layout";
import { Ticket } from "@/components/Ticket";

// utilities
import { useAllTickets } from "@/utilities/hook";
// import { db } from "@/utilities/firebase";

// // interface
// import { TicketFace } from "@/interface";

export const DashBoardPage: React.FC = () => {
    const { isLoading, allTickets } = useAllTickets();
    // style
    const wrapperClass = classNames(
        twMerge("flex flex-col gap-3 p-12 overflow-auto")
    );

    return (
        <Layout>
            <DragDropContext onDragEnd={() => console.log("drag end")}>
                <Droppable droppableId="collections" type="droppableItem">
                    {({ innerRef, placeholder }) => (
                        <div className={wrapperClass} ref={innerRef}>
                            {isLoading && <div>loading</div>}
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
