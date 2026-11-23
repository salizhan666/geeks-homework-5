import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { useSession } from "../../hooks/useSession"
import { cartService } from "../../service/cart-service"

export const useAddProductToCart = (productId) => {

    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const isAuth = useSession(state => state.isAuth)
    const cart = useQuery({ ...cartService.getCartQueryParams(), enabled: isAuth })
    const inCart = isAuth && cart.data?.some(item => item.product._id === productId)

    const addProductMutation = useMutation({
        mutationFn: cartService.addProductToCart,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [cartService.basekey] })
    })

    const handleSubmit = () => {
        if (!isAuth) {
            window.alert('Войдите в аккаунт, чтобы добавить товар в корзину')
            return
        }
        if (inCart) {
            navigate('/cart')
            return
        }
        const product = {
            productId: productId,
            quantity: 1
        }

        addProductMutation.mutate(product)
    }

    return {
        inCart,
        isPending: addProductMutation.isPending || (isAuth && cart.isLoading),
        handleSubmit
    }
}
