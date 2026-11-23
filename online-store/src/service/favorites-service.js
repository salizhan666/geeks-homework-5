import { queryOptions } from "@tanstack/react-query"
import { $authApi } from "../api-instance"

export const favoritesService = {
    baseKey: 'favorites',

    getFavoritesQueryOptions: () => {
        return queryOptions({
            queryKey: [favoritesService.baseKey],
            queryFn: favoritesService.getFavorites
        })
    },

    getFavorites: async () => {
        const response = await $authApi.get('/favorites')
        console.log('service log', response.data?.data?.products);
        return response.data?.data?.products
    },

    addToFavorites: async (productId) => {
        const response = await $authApi.post('/favorites/', { productId })
        return response.data
    },

    removeFromFavorite: async (productId) => {
        const response = await $authApi.delete(`/favorites/${productId}`)
        return response.data
    }
}