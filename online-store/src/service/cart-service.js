import { queryOptions } from "@tanstack/react-query"
import { $authApi } from "../api-instance"

export const cartService = {
    basekey: 'cart',

    getAll: async () => {
        const response = await $authApi.get('/cart')
        return response.data?.data?.items
    },

    getCartQueryParams: () => {
        return queryOptions({
            queryKey: [cartService.basekey],
            queryFn: cartService.getAll
        })
    },

    addProductToCart: async (product) => {        
        const response = await $authApi.post('/cart', product)
        return response.data
    },

    deleteAll: async () => {
        const response = await $authApi.delete('/cart')
        return response.data
    },
    
    delete: async (productId) => {
        const response = await $authApi.delete(`/cart/${productId}`)
        return response.data
    },
    
    refreshQuantity: async (productId, quantity) => {
        const response = await $authApi.patch(`/cart/${productId}`, { quantity })
        return response.data
    },

}
