import { queryOptions } from "@tanstack/react-query";
import { $authApi, $mainApi } from "../api-instance"

export const productService = {
    baseKey: 'products',

    getAll: async ({ category, minPrice, maxPrice, searchQuery }, { signal }) => {
        const response = await $authApi.get('/products', {
            params: {
                category,
                minPrice,
                maxPrice: maxPrice == '' ? null : maxPrice,
                search: searchQuery,
            },
            signal
        });
        return response.data
    },

    getProductsQueryOptions: ({ category, minPrice, maxPrice, searchQuery }) => {
        return queryOptions({
            queryKey: [productService.baseKey, { category, minPrice, maxPrice, searchQuery }],
            queryFn: (meta) => productService.getAll({ category, minPrice, maxPrice, searchQuery }, meta),
        })
    },

    getById: async (id) => {
        const response = await $mainApi.get(`/products/${id}`);
        return response.data
    },
}
