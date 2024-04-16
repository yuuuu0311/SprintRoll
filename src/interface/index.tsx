export interface TicketFace {
    id: number;
    name: string;
    ticketID?: string;
}

export interface CollectionFace extends TicketFace {
    domain: string;
    product: string;
    order: number;
    collectionID: string;
}
