import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { productService } from '../service/productService'

export const useProductsSearch = (search, page) => {
    const query = search.trim()

    return useQuery({
        queryKey: ['products', 'search', query, page],
        queryFn: ({ signal }) => productService.searchProducts(query, page, signal),
        enabled: query.length >= 3,
        placeholderData: (previousData, previousQuery) => {
            if (previousQuery?.queryKey[2] === query) {
                return keepPreviousData(previousData)
            }
            return undefined
        },
        staleTime: 60_000,
    })

}
