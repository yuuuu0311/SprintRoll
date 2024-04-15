// dependency
import { collection, getDocs } from "firebase/firestore";

// utilities
import { db } from "@/utilities/firebase";
import { useEffect, useState } from "react";

// interface
import { CollectionFace, TicketFace } from "@/interface";

export const useCollections = (domain: string | undefined) => {
    const [isLoading, setIsLoading] = useState(false);
    const [collectionsData, setCollectionsData] = useState<
        unknown | CollectionFace[]
    >();
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);

                const collectionsRef = collection(db, "collections");
                // with certain collection want to find
                // const q = query(
                //     collectionsRef,
                //     where("domain", "==", domain?.toLowerCase())
                // );

                const querySnapshot = await getDocs(collectionsRef);

                setCollectionsData(() =>
                    querySnapshot.docs.map((doc) => ({
                        collectionID: doc.id,
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
    }, [domain]);

    return { isLoading, isError, collectionsData, setCollectionsData };
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
                    querySnapshot.docs.map((doc) => doc.data())
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
