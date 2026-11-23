import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { favoritesService } from "../../service/favorites-service"
import { productService } from "../../service/product-service"

export const useToggleFavotire = (productId) => {
    const queryClient = useQueryClient()
    const { data: favorites, isFetching } = useQuery({
        ...favoritesService.getFavoritesQueryOptions(),
        enabled: Boolean(productId)
    })
    const isFavorite = productId ? favorites?.some(item => item._id === productId) : undefined

    const addMutation = useMutation({
        mutationFn: favoritesService.addToFavorites,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [favoritesService.baseKey] })
            queryClient.invalidateQueries({ queryKey: [productService.baseKey] })
        },
    })

    const removeMutation = useMutation({
        mutationFn: favoritesService.removeFromFavorite,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [favoritesService.baseKey] })
            queryClient.invalidateQueries({ queryKey: [productService.baseKey] })
        },
    })

    const toggleMutation = (isFavorite, id) => {
        if (isFavorite) {
            removeMutation.mutate(id)
        } else {
            addMutation.mutate(id)
        }
    }

    return {
        mutate: toggleMutation,
        toggle: () => toggleMutation(isFavorite, productId),
        isFavorite,
        isPending: addMutation.isPending || removeMutation.isPending || Boolean(productId && (isFetching || isFavorite === undefined))
    }
}
