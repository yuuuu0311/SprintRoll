export interface TicketFace {
    id: number;
    name: string;
    order: number;
    ticketID?: string;
}

export interface CollectionFace extends TicketFace {
    domain: string;
    product: string;
    collectionID: string;
}
