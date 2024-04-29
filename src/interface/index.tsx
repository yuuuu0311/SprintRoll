import { Dispatch, SetStateAction } from "react";
import { Timestamp } from "firebase/firestore";

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
    label?: LabelFace;
    status?: string | number | undefined;
    createdTime: {
        seconds: number;
        nanoseconds: number;
    };
}

export interface CollectionFace extends TicketFace {
    domain: string;
    product: string;
    collectionID: string;
}

export interface UserFace {
    domain?: string;
    name?: string;
    email: string | null;
    uid: string | null;
    setUser: (userInfo: UserFace) => void;
}

export interface DialogState {
    isActive: boolean;
    toggleDialog: (prev: boolean) => void;
}

export interface SprintFace {
    index?: number;
    project?: string;
    name: string;
    description: string;
    cycle: [Timestamp | Date, Timestamp | Date | undefined];
}

export interface LabelFace {
    isCheck?: { [key: string]: boolean };
}

export interface LabelInputFace extends LabelFace {
    ticketInfo: TicketFace;
    labelName: string;
    // isCheck: object | undefined;
    changeHandler?: Dispatch<SetStateAction<LabelFace>>;
}

export interface ProjectFace {
    id?: string;
    name: string;
    domain: string[];
    owner: string;
}
