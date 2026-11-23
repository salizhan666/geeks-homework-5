import { create } from "zustand";

export const useSession = create((set) => {
    return {
        isAuth: Boolean(localStorage.getItem('accessToken')),
        user: null,

        setUser: (user) => {
            set({ user })
        },

        setAuth: (isAuth) => {
            set({ isAuth })
        },

        reset: () => {
            set({
                isAuth: false,
                user: null
            })
        },
    }
})