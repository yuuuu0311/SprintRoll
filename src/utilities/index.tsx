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
import { CollectionFace, TicketFace, UserFace } from "@/interface";

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

        console.log(docRef);

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
    const sourceRef = collection(
        db,
        `collections/${source.droppableId}/tickets/`
    );
    const sourceSnap = await getDocs(sourceRef);
    const [sourceTarget] = sourceSnap.docs.filter(
        (doc) => doc.id === draggableId
    );

    deleteTicket(source.droppableId, draggableId);
    orderSourceInCollection(source);

    await orderDestInCollection(destination);
    setTicket(destination.droppableId, draggableId, {
        ...sourceTarget.data(),
        order: destination.index,
    });
};

export const setTicket = async (
    collectionID: string,
    ticketID: string,
    data: object
) => {
    await setDoc(
        doc(db, `collections/${collectionID}/tickets`, ticketID),
        data
    );
};

export const deleteTicket = async (
    collectionID: string,
    ticketID: string,
    index?: number
) => {
    orderSourceInCollection({
        droppableId: collectionID,
        index: index as number,
    });
    await deleteDoc(doc(db, `collections/${collectionID}/tickets`, ticketID));
};

export const orderSourceInCollection = async (source: {
    droppableId: string;
    index: number;
}) => {
    const { droppableId: collectionID, index } = source;
    const collectionsRef = collection(
        db,
        `collections/${collectionID}/tickets`
    );
    const sourceQuery = query(collectionsRef, where("order", ">", index));

    const sourceQuerySnapshot = await getDocs(sourceQuery);
    sourceQuerySnapshot.forEach((doc) => {
        const docRef = doc.ref;

        updateDoc(docRef, {
            order: doc.data().order - 1,
        });
    });
};

export const orderDestInCollection = async (dest: {
    droppableId: string;
    index: number;
}) => {
    const { droppableId: collectionID, index } = dest;
    const collectionsRef = collection(
        db,
        `collections/${collectionID}/tickets`
    );
    const destQuery = query(collectionsRef, where("order", ">=", index));

    const destQuerySnapshot = await getDocs(destQuery);
    destQuerySnapshot.forEach((doc) => {
        const docRef = doc.ref;

        updateDoc(docRef, {
            order: doc.data().order + 1,
        });
    });
};

export const getDomainDeveloper: (
    domain: string,
    name: string
) => void = async (domain, name) => {
    const usersRef = collection(db, `users`);

    const usersQuerySnapshot = await getDocs(usersRef);

    const regex = new RegExp(name);

    const developersDocs = usersQuerySnapshot.docs.filter(
        (doc) => doc.data().domain == domain && regex.test(doc.data().name)
    );

    console.log(developersDocs.map((doc) => ({ ...doc.data() })));

    return developersDocs.map((doc) => ({ ...doc.data() }));
};

export const assignDeveloper: (
    developerInfo: UserFace,
    isInCollection: string,
    ticketID: string
) => void = async (developerInfo, isInCollection, ticketID) => {
    const docRef = doc(db, `collections/${isInCollection}/tickets/${ticketID}`);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) return;
    const modifiedArr = [...docSnap.data().assignedDeveloper];

    modifiedArr.push(developerInfo.name);

    await setDoc(docRef, {
        ...docSnap.data(),
        assignedDeveloper: modifiedArr,
    });
};

export const removeFromAssigned: (
    developerInfo: UserFace,
    isInCollection: string,
    ticketID: string
) => void = async (developerInfo, isInCollection, ticketID) => {
    const docRef = doc(db, `collections/${isInCollection}/tickets/${ticketID}`);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) return;
    const modifiedArr = [...docSnap.data().assignedDeveloper];
    const index = modifiedArr.indexOf(developerInfo.name);

    modifiedArr.splice(index, 1);

    await setDoc(docRef, {
        ...docSnap.data(),
        assignedDeveloper: modifiedArr,
    });
};
