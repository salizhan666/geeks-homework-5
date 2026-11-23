import { useMutation, useQueryClient } from "@tanstack/react-query"
import { authService } from "../../service/auth-service"
import { useNavigate } from "react-router-dom"
import { productService } from "../../service/product-service"
import { useSession } from "../../hooks/useSession"

export const useLogin = () => {

    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const setAuth = useSession((state) => state.setAuth)

    const loginMutation = useMutation({
        mutationFn: async (loginData) => {
            const response = await authService.login(loginData);
            return response
        },

        onSuccess: (data) => {
            localStorage.setItem('accessToken', data?.accessToken)
            setAuth(true)
            queryClient.invalidateQueries({ queryKey: [productService.baseKey] })
            navigate('/')
        },

        onError: (error) => {
            console.log('Login failed', error);
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault()

        const formData = new FormData(e.target)

        const loginData = {
            loginOrEmail: formData.get('loginOrEmail') || '',
            password: formData.get('password') || ''
        }

        loginMutation.mutate(loginData)

        e.target.reset()
    }

    return {
        handleSubmit,
        isPending: loginMutation.isPending
    }
}