// export type TicketType = {
//     itemInfo: {
//         id: number;
//         name: string;
//         category: number;
//     };
//     index: number;
// };

export interface TicketListFace {
    id: number;
    name: string;
}

export interface TicketFace extends TicketListFace {
    category?: number;
}
