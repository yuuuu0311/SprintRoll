// dependency
import {
    collection,
    getDocs,
    onSnapshot,
    query,
    where,
} from "firebase/firestore";

// utilities
import { db } from "@/utilities/firebase";
import { useEffect, useState } from "react";

// interface
import { CollectionFace, TicketFace } from "@/interface";

export const useCollections = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [collectionsData, setCollectionsData] = useState<
        unknown | CollectionFace[]
    >();

    useEffect(() => {
        const collectionsRef = collection(db, "collections");

        // const q = query(
        //     collectionsRef,
        //     where("domain", "==", domain?.toLowerCase())
        // );

        const unsubscribe = onSnapshot(collectionsRef, (collection) => {
            setIsLoading(true);

            setCollectionsData(() =>
                collection.docs.map((doc) => ({
                    collectionID: doc.id,
                    ...doc.data(),
                }))
            );
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return { isLoading, collectionsData, setCollectionsData };
};

export const useTickets = (id: string) => {
    const [isLoading, setIsLoading] = useState(false);
    const [ticketsData, setTicketsData] = useState<unknown | TicketFace[]>();
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);

                const ticketsRef = collection(db, `collections/${id}/tickets`);

                const querySnapshot = await getDocs(ticketsRef);

                setTicketsData(() =>
                    querySnapshot.docs.map((doc) => ({
                        ticketID: doc.id,
                        ...doc.data(),
                    }))
                );
                setIsLoading(false);
            } catch (error) {
                setIsError(true);
                setIsLoading(false);
                console.log(error);
            }
        })();
    }, [id]);

    return { isLoading, isError, ticketsData, setTicketsData };
};
