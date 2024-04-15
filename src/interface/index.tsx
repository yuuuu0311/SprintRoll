export interface TicketFace {
    id: number;
    name: string;
}

export interface CollectionFace extends TicketFace {
    domain: string;
    product: string;
}
