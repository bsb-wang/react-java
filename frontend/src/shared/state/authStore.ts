import { create } from "zustand";

export type User = {
    userId: string,
    name: string
}

type AuthState = {
    isLoggedIn: boolean;
    user: User;
    login: (user: { userId: string, name: string }) => void;
    logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
    isLoggedIn: false,
    user: { userId: '', name: '' },

    login: (user) => set({ isLoggedIn: true, user }),
    logout: () => set({ isLoggedIn: false, user: { userId: '', name: '' } }),
}));
