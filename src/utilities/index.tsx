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
