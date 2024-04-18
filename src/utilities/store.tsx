import { useEffect, useState } from "react";
// dependency
import { create } from "zustand";

import { collection, onSnapshot, where, query } from "firebase/firestore";

// interface
import { CollectionFace } from "@/interface";

// utilities
import { db } from "@/utilities/firebase";

export interface CountState {
    count: number;
    increase: (by: number) => void;
    resetCount: () => void;
}

export const useCountStore = create<CountState>()((set) => ({
    count: 0,
    increase: (by) => set((state) => ({ count: state.count + by })),
    resetCount: () => set({ count: 0 }),
}));

export const useCollectionWithZustand = (domain: string | undefined) => {
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

    const useCollectionTest = create()(() => {
        return {
            collection: collectionsData,
            // setCollectionsData: () => set((state) => ({ count: state.count + by }),
            // count: 0,
            // increase: (by) => set((state) => ({ count: state.count + by })),
        };
    });

    return { isLoading, useCollectionTest };
};
