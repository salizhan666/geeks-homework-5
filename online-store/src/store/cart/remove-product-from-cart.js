import { useMutation, useQueryClient } from "@tanstack/react-query"
import { cartService } from "../../service/cart-service"

export const useRemoveProductFromCart = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: cartService.delete,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [cartService.basekey] })
    })
}
