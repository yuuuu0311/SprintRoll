// dependency
import { create } from "zustand";

import { DialogState, UserFace } from "@/interface";

export const useDialog = create<DialogState>()((set) => ({
    isActive: false,
    toggleDialog: (prev) => set(() => ({ isActive: prev ? false : true })),
}));

export const useUser = create<UserFace>()((set) => ({
    uid: "",
    email: "",
    setUser: (userInfo: UserFace) =>
        set({
            uid: userInfo.uid,
            email: userInfo.email,
        }),
}));
