// dependency
import {
    collection,
    query,
    where,
    getDocs,
    updateDoc,
} from "firebase/firestore";

// utilities
import { db } from "@/utilities/firebase";
// import { useEffect, useState } from "react";

// interface
import { CollectionFace, TicketFace } from "@/interface";

export const rearange: (
    arr: (CollectionFace | TicketFace)[],
    sourceIndex: number,
    destIndex: number
) => (CollectionFace | TicketFace)[] = (arr, sourceIndex, destIndex) => {
    const arrCopy = [...arr];
    const [removed] = arrCopy.splice(sourceIndex, 1);
    arrCopy.splice(destIndex, 0, removed);

    return arrCopy;
};

export const orderCollection = async (
    sourceIndex: number,
    destIndex: number
) => {
    const collectionsRef = collection(db, "collections");
    const destQuery = query(collectionsRef, where("order", "==", destIndex));
    const sourceQuery = query(
        collectionsRef,
        where("order", "==", sourceIndex)
    );

    const destQuerySnapshot = await getDocs(destQuery);
    const sourceQuerySnapshot = await getDocs(sourceQuery);

    destQuerySnapshot.forEach((doc) => {
        const docRef = doc.ref;

        updateDoc(docRef, {
            order: sourceIndex,
        })
            .then(() => {
                console.log("Document successfully updated!");
            })
            .catch((error) => {
                console.error("Error updating document: ", error);
            });
    });

    sourceQuerySnapshot.forEach((doc) => {
        const docRef = doc.ref;

        updateDoc(docRef, {
            order: destIndex,
        })
            .then(() => {
                console.log("Document successfully updated!");
            })
            .catch((error) => {
                console.error("Error updating document: ", error);
            });
    });
};

// export const getCollectionIndex: (
//     collections: CollectionFace[],
//     id: string
// ) => number = (collections, id) => {
//     let collectionIndex = -1;

//     collections.forEach((collection, index) => {
//         if (collection.id === parseInt(id)) collectionIndex = index;
//     });

//     return collectionIndex;
// };
