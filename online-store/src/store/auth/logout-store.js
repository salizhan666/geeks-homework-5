import { useMutation, useQueryClient } from "@tanstack/react-query"
import { authService } from "../../service/auth-service"
import { useNavigate } from "react-router-dom"
import { useSession } from "../../hooks/useSession"
import { productService } from "../../service/product-service"
import { favoritesService } from "../../service/favorites-service"
import { cartService } from "../../service/cart-service"

export const useLogout = () => {

    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const reset = useSession((state) => state.reset)

    const logoutMutation = useMutation({
        mutationFn: authService.logout,

        onSuccess: () => {
            localStorage.removeItem('accessToken')
            reset()
            queryClient.removeQueries({ queryKey: [cartService.basekey] })
            queryClient.invalidateQueries({ queryKey: [productService.baseKey] })
            queryClient.invalidateQueries({ queryKey: [favoritesService.baseKey] })
            navigate('/')
        }
    })

    return {
        logout: logoutMutation.mutate,
        isPending: logoutMutation.isPending
    }
}
