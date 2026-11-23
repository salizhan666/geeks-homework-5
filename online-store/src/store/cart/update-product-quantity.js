import { useMutation, useQueryClient } from "@tanstack/react-query"
import { cartService } from "../../service/cart-service"

export const useUpdateProductQuantity = (productId) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (quantity) => cartService.refreshQuantity(productId, quantity),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [cartService.basekey] })
    })
}
