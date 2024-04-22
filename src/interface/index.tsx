export interface TicketFace {
    id: number;
    name?: string;
    title?: string;
    description?: string;
    order: number;
    ticketID?: string;
    collectionID?: string;
    domain?: string;
    assignedDeveloper?: [];
    label?: object;
}

export interface CollectionFace extends TicketFace {
    domain: string;
    product: string;
    collectionID: string;
}

export interface UserFace {
    domain: string;
    email: string;
    name: string;
    uid: string;
}

export interface DialogState {
    isActive: boolean;
    toggleDialog: (prev: boolean) => void;
}

// collection: {
//     ...collectionData
//     tickets: [
//         ...ticketsData
//     ]

// }
