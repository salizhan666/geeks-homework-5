import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { productService } from '../service/productService'

export const useProducts = (page) => {
    return useQuery({
        queryKey: ['products', page],
        queryFn: ({ signal }) => productService.getProducts(page, signal),
        placeholderData: keepPreviousData,
        staleTime: 60_000,
    })

}
