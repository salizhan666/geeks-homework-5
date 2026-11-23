import { create } from "zustand";

export const useFilterStore = create((set) => ({
    filter: {
        category: null,
        minPrice: null,
        maxPrice: null,
        searchQuery: '',
    },

    setCategory: (category) => set((state) => ({
        filter: { ...state.filter, category }
    })),

    setMinPrice: (minPrice) => set((state) => ({
        filter: { ...state.filter, minPrice }
    })),

    setMaxPrice: (maxPrice) => set((state) => ({
        filter: { ...state.filter, maxPrice }
    })),

    setSearchQuery: (searchQuery) => {
        let timer

        clearTimeout(timer)

        timer = setTimeout(() => {
            set((state) => ({
                filter: { ...state.filter, searchQuery }
            }))
        }, 500)
    },

}))
