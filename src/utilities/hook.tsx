// dependency
import { collection, onSnapshot, where, query } from "firebase/firestore";

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

        const q = query(
            collectionsRef,
            where("domain", "==", domain?.toLowerCase())
        );

        const unsubscribe = onSnapshot(q, (collection) => {
            setIsLoading(true);

            const collectionCopy = collection.docs.map((doc) => ({
                ...(doc.data() as CollectionFace),
                collectionID: doc.id,
            }));

            setCollectionsData(() =>
                collectionCopy.sort((a, b) => a.order - b.order)
            );

            setIsLoading(false);
        });

        return () => unsubscribe();
    }, [domain]);

    return { isLoading, collectionsData };
};

export const useTickets = (id: string) => {
    const [isLoading, setIsLoading] = useState(false);
    const [ticketsData, setTicketsData] = useState<TicketFace[]>();

    useEffect(() => {
        const ticketsRef = collection(db, `collections/${id}/tickets`);

        const unsubscribe = onSnapshot(ticketsRef, (tickets) => {
            setIsLoading(true);

            const ticketsCopy = tickets.docs.map((doc) => ({
                ...(doc.data() as TicketFace),
                ticketID: doc.id,
            }));

            setTicketsData(() => ticketsCopy.sort((a, b) => a.order - b.order));

            setIsLoading(false);
        });

        return () => unsubscribe();
    }, [id]);

    return { isLoading, ticketsData, setTicketsData };
};