export interface TicketFace {
    id: number;
    name?: string;
    title?: string;
    description?: string;
    order: number;
    ticketID?: string;
    isInCollection?: string;
}

export interface CollectionFace extends TicketFace {
    domain: string;
    product: string;
    collectionID: string;
}

// collection: {
//     ...collectionData
//     tickets: [
//         ...ticketsData
//     ]

// }
