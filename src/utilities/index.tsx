// dependency
import {
    collection,
    query,
    where,
    getDocs,
    getDoc,
    doc,
    setDoc,
    updateDoc,
    deleteDoc,
} from "firebase/firestore";

// utilities
import { db } from "@/utilities/firebase";

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

export const orderTicket = async (
    sourceIndex: number,
    destIndex: number,
    droppableID: string | undefined
) => {
    const collectionsRef = collection(db, `collections/${droppableID}/tickets`);
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

export const toAnotherCollection = async (
    source: {
        index: number;
        droppableId: string;
    },
    destination: {
        index: number;
        droppableId: string;
    },

    draggableId: string
) => {
    // [x] remove from original
    // [x] add to new collection
    // [ ] how to order.....

    const destRef = doc(db, `collections/${destination.droppableId}/`);
    const destSnap = await getDoc(destRef);

    await deleteDoc(
        doc(db, `collections/${source.droppableId}/tickets`, draggableId)
    );

    await setDoc(
        doc(db, `collections/${destination.droppableId}/tickets`, draggableId),
        destSnap.data()
    );
};

export const deleteTicket = async (collectionID: string, ticketID: string) => {
    await deleteDoc(doc(db, `collections/${collectionID}/tickets`, ticketID));
};
