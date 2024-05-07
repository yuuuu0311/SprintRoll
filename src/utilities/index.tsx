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
    collectionGroup,
    addDoc,
    documentId,
} from "firebase/firestore";

// utilities
import { db } from "@/utilities/firebase";

// interface
import {
    CollectionFace,
    SprintFace,
    TicketFace,
    UserFace,
    ProjectFace,
} from "@/interface";

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
    destIndex: number,
    domain: string
) => {
    const collectionsRef = collection(db, "collections");
    const destQuery = query(collectionsRef, where("order", "==", destIndex));
    const sourceQuery = query(
        collectionsRef,
        where("order", "==", sourceIndex)
    );

    const destQuerySnapshot = await getDocs(destQuery);
    const sourceQuerySnapshot = await getDocs(sourceQuery);

    destQuerySnapshot.docs
        .filter((doc) => doc.data().domain === domain)
        .forEach((doc) => {
            const docRef = doc.ref;
            updateDoc(docRef, {
                order: sourceIndex,
            });
        });

    sourceQuerySnapshot.docs
        .filter((doc) => doc.data().domain === domain)
        .forEach((doc) => {
            const docRef = doc.ref;
            updateDoc(docRef, {
                order: destIndex,
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
        });
    });

    sourceQuerySnapshot.forEach((doc) => {
        const docRef = doc.ref;

        updateDoc(docRef, {
            order: destIndex,
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

    const sourceQuerySnapshot = await getDocs(collectionsRef);
    sourceQuerySnapshot.docs
        .filter((doc) => doc.data().order > index)
        .forEach((doc) => {
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

export const toSprint = async (draggableId: string, index: number) => {
    const ticket = query(
        collectionGroup(db, "tickets"),
        where(documentId(), "==", draggableId)
    );

    const tickets = await getDocs(ticket);

    tickets.forEach((ticket) => {
        setDoc(ticket.ref, {
            ...ticket.data(),
            inSprint: index,
        });
    });
};

export const updateTicketInfo = async (
    ticketInfo: TicketFace,
    obj: { target: string; value: string | object }
) => {
    console.log(ticketInfo);

    const docRef = doc(
        db,
        `collections/${ticketInfo.collectionID}/tickets/${ticketInfo.ticketID}`
    );
    const docSnap = await getDoc(docRef);

    await setDoc(docRef, {
        ...docSnap.data(),
        [obj.target]: obj.value,
    });
};

export const resetTicketStatus = async (ticketID: string) => {
    const docRef = doc(db, ticketID);

    await updateDoc(docRef, {
        inSprint: null,
    });
};

export const addSprint = async (sprintInfo: SprintFace) => {
    const sprintsRef = collection(db, "sprints");

    await addDoc(sprintsRef, {
        ...sprintInfo,
    });
};

export const toAnotherSprint = async (
    ticketId: string,
    sprintIndex: number
) => {
    const ticketRef = doc(db, ticketId);

    updateDoc(ticketRef, {
        inSprint: sprintIndex,
    });
};

export const addProject = async (projectInfo: ProjectFace) => {
    const projectsRef = collection(db, "projects");

    await addDoc(projectsRef, {
        ...projectInfo,
    });
};

export const deleteProject = async (projectInfo: ProjectFace) => {
    await deleteDoc(doc(db, `projects/${projectInfo.id}`));
};

export const removeCollaborator = async (
    projectID: string | undefined,
    uid: string
) => {
    await deleteDoc(doc(db, `projects/${projectID}/collaborators/${uid}`));
};

export const addCollaborator = async (
    projectID: string | undefined,
    uid: string,
    data: {
        name: string;
        role: number;
    }
) => {
    await setDoc(doc(db, `projects/${projectID}/collaborators/`, uid), data);
};

export const updateSprint = async (sprintInfo: SprintFace) => {
    await updateDoc(doc(db, `sprints/${sprintInfo.id}`), { ...sprintInfo });
};

export const searchViaEmail = async (email: string) => {
    const regex = new RegExp(email);
    const userRef = collection(db, `users`);
    const userSnapshot = await getDocs(userRef);

    return userSnapshot.docs
        .filter((doc) => regex.test(doc.data().email))
        .map((doc) => doc.data());
};

export const handleDeleteSprint = async (
    project: string | undefined,
    sprintInfo: SprintFace
) => {
    const sprintTicketsRef = query(
        collectionGroup(db, "tickets"),
        where("inSprint", "==", sprintInfo.index),
        where("project", "==", project)
    );

    const docRef = doc(db, `sprints/${sprintInfo.id}/`);
    const ticketsSnap = await getDocs(sprintTicketsRef);

    try {
        await deleteDoc(docRef);

        ticketsSnap.forEach(async (doc) => {
            await updateDoc(doc.ref, { ...doc.data(), inSprint: null });
        });
    } catch (error) {
        console.log(error);
    }
};

export const addCollectionsViaTemplate: (
    projectName: string
) => Promise<void> = async (projectName: string) => {
    const domainStructure = ["frontend", "backend", "data", "ios"];
    const collectionStructure = ["to do", "doing", "done"];

    try {
        domainStructure.forEach(async (domain) => {
            const collectionsRef = collection(db, "collections");

            collectionStructure.forEach(async (collectionName, index) => {
                await addDoc(collectionsRef, {
                    domain: domain,
                    order: index,
                    project: projectName,
                    product: "SprintRoll",
                    name: collectionName,
                });
            });
        });
    } catch (error) {
        console.log(error);
    }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const debounce = (fn: any, delay: number) => {
    let timer: number;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (...args: any) => {
        clearTimeout(timer);
        timer = window.setTimeout(() => {
            fn(...args);
        }, delay);
    };
};
