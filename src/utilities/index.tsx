// interface
import { CollectionFace, TicketFace } from "@/interface";

export const firebaseConfig = {
    apiKey: "AIzaSyD47I7lV3NBKsqnYSIMTKf64HtPpi5sBfo",
    authDomain: "sprintroll-9c8c2.firebaseapp.com",
    projectId: "sprintroll-9c8c2",
    storageBucket: "sprintroll-9c8c2.appspot.com",
    messagingSenderId: "772872341958",
    appId: "1:772872341958:web:b21f99865028bf39c48ac7",
};

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

export const getCollectionIndex: (
    collections: CollectionFace[],
    id: string
) => number = (collections, id) => {
    let collectionIndex = -1;

    collections.forEach((collection, index) => {
        if (collection.id === parseInt(id)) collectionIndex = index;
    });

    return collectionIndex;
};
