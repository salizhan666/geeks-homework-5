import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { orderService } from "../../service/order-service"
import { cartService } from "../../service/cart-service"

export const useCreateOrder = (cartItems) => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    return useMutation({
        mutationFn: ({ deliveryAddress, comment }) => {
            const items = cartItems.map(({ product, quantity }) => ({
                productId: product._id,
                quantity,
                price: product.price
            }))

            return orderService.createOrder({ items, deliveryAddress, comment: comment.trim() })
        },
        onSuccess: async () => {
            toast.success('Order created.')
            try {
                await cartService.deleteAll()
                queryClient.setQueryData([cartService.basekey], [])
            } catch {
                toast.warning('Your order was created, but we could not confirm that your cart was cleared.')
            }
            queryClient.invalidateQueries({ queryKey: [cartService.basekey] })
            queryClient.invalidateQueries({ queryKey: [orderService.basekey] })
            navigate('/orders', { replace: true })
        },
        onError: () => toast.error('Could not create your order. Please try again.')
    })
}
