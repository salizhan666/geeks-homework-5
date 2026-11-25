import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { orderService } from "../../service/order-service"

export const useCancelOrder = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: orderService.cancelOrderById,
        onSuccess: () => {
            toast.success('Order cancelled.')
            return queryClient.invalidateQueries({ queryKey: [orderService.basekey] })
        },
        onError: () => toast.error('Could not cancel your order. Please try again.')
    })
}
