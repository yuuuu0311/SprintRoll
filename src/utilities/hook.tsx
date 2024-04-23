// dependency
import { collection, onSnapshot, collectionGroup } from "firebase/firestore";

// utilities
import { db } from "@/utilities/firebase";
import { useEffect, useState } from "react";

// interface
import { CollectionFace, TicketFace } from "@/interface";

export const useCollections = (domain: string) => {
    const [isLoading, setIsLoading] = useState(false);
    const [collectionsData, setCollectionsData] = useState<CollectionFace[]>();

    useEffect(() => {
        const collectionsRef = collection(db, "collections");

        const unsubscribe = onSnapshot(collectionsRef, (collection) => {
            setIsLoading(true);
            setCollectionsData(() =>
                collection.docs
                    .filter((doc) => doc.data().domain === domain)
                    .map((doc) => ({
                        ...(doc.data() as CollectionFace),
                        collectionID: doc.id,
                    }))
                    .sort((a, b) => a.order - b.order)
            );
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, [domain]);

    return { isLoading, collectionsData, setCollectionsData };
};

export const useTickets = (id?: string) => {
    const [isLoading, setIsLoading] = useState(false);
    const [ticketsData, setTicketsData] = useState<TicketFace[]>();

    useEffect(() => {
        const ticketsRef = collection(db, `collections/${id}/tickets`);

        const unsubscribe = onSnapshot(ticketsRef, (tickets) => {
            setIsLoading(true);

            setTicketsData(() =>
                tickets.docs
                    .map((doc) => ({
                        ...(doc.data() as TicketFace),
                        collectionID: id,
                        ticketID: doc.id,
                    }))
                    .sort((a, b) => a.order - b.order)
            );

            setIsLoading(false);
        });

        return () => unsubscribe();
    }, [id]);

    return { isLoading, ticketsData, setTicketsData };
};

export const useAllTickets = (index?: number) => {
    const [isLoading, setIsLoading] = useState(false);
    const [allTickets, setAllTickets] = useState<TicketFace[]>([]);
    const [isTicketLoading, setIsTicketLoading] = useState(false);
    const [sprintTickets, setSprintTickets] = useState<TicketFace[]>([]);

    useEffect(() => {
        const ticketsRef = collectionGroup(db, "tickets");

        const unsubscribe = onSnapshot(ticketsRef, (tickets) => {
            setIsLoading(true);

            const allTicketCopy = tickets.docs
                .filter(
                    (ticket) =>
                        !ticket.data().inSprint && ticket.data().inSprint !== 0
                )
                .map((ticket) => ({
                    ...(ticket.data() as TicketFace),
                    ticketID: ticket.ref.path,
                }));

            const sprintTicketsCopy = tickets.docs
                .filter((ticket) => ticket.data().inSprint == index)
                .map((ticket) => ({
                    ...(ticket.data() as TicketFace),
                    ticketID: ticket.ref.path,
                }));

            setAllTickets(allTicketCopy);
            setSprintTickets(sprintTicketsCopy);
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, [index]);

    return {
        isLoading,
        allTickets,
        isTicketLoading,
        sprintTickets,
        setAllTickets,
        setIsTicketLoading,
    };
};

export const useSprint = () => {
    const [isSprintLoading, setIsSprintLoading] = useState(false);
    const [sprintInfo, setSprintInfo] = useState([]);

    useEffect(() => {
        const sprintsRef = collection(db, "sprints");

        const unsubscribe = onSnapshot(sprintsRef, (collection) => {
            setIsSprintLoading(true);

            setSprintInfo(() => collection.docs.map((doc) => doc.data()) as []);

            setIsSprintLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return { isSprintLoading, sprintInfo };
};
