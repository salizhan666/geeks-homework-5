import { queryOptions } from "@tanstack/react-query"
import { $authApi } from "../api-instance"

export const orderService = {
    basekey: 'order',

    getAll: async () => {
        const response = await $authApi.get('/orders')
        return response.data?.data
    },

    getQueryOptions: () => {
        return queryOptions({
            queryKey: [orderService.basekey],
            queryFn: orderService.getAll
        })
    },

    getById: async (id) => {
        const response = await $authApi.get(`/orders/${id}`)
        return response.data
    },

    createOrder: async (order) => {
        const response = await $authApi.post('/orders', order)
        return response.data
    },

    cancelOrderById: async (id) => {
        return await $authApi.patch(`/orders/${id}/cancel`)
    },

}