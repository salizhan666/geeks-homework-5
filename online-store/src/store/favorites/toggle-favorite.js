import { useMutation, useQueryClient } from "@tanstack/react-query"
import { favoritesService } from "../../service/favorites-service"
import { productService } from "../../service/product-service"

export const useToggleFavotire = () => {
    const queryClient = useQueryClient()

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
        isPending: addMutation.isPending || removeMutation.isPending
    }
}