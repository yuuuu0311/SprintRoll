export interface TicketFace {
    id: number;
    name: string;
    ticketID?: string;
}

export interface CollectionFace extends TicketFace {
    collectionID: string;
    domain: string;
    product: string;
}
