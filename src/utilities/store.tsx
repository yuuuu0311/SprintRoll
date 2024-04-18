// dependency
import { create } from "zustand";

import { DialogState } from "@/interface";

export const useDialog = create<DialogState>()((set) => ({
    isActive: false,
    toggleDialog: (prev) => set(() => ({ isActive: prev ? false : true })),
}));
