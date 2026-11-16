import { queryOptions } from "@tanstack/react-query";
import { $mainApi } from "../api-instance"

export const categoryService = {
    baseKey: 'categories',

    getAll: async () => {
        const response = await $mainApi.get('/categories');
        return response.data?.data
    },

    getCategoryQueryOptions: () => {
        return queryOptions({
            queryKey: [categoryService.baseKey],
            queryFn: categoryService.getAll,
        })
    },

    getById: async (id) => {
        const response = await $mainApi.get(`/categories/${id}`);
        return response.data?.data
    },
}