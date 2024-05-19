import { CollectionFace, TicketFace, mockTicketFace } from "@/interface";

export const rearange: (
    arr: (CollectionFace | TicketFace | mockTicketFace)[],
    sourceIndex: number,
    destIndex: number
) => (CollectionFace | TicketFace | mockTicketFace)[] = (
    arr,
    sourceIndex,
    destIndex
) => {
    const arrCopy = [...arr];
    const [removed] = arrCopy.splice(sourceIndex, 1);
    arrCopy.splice(destIndex, 0, removed);

    return arrCopy;
};
