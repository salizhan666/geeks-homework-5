import { useMutation } from "@tanstack/react-query"
import { authService } from "../../service/auth-service"
import { useNavigate } from "react-router-dom"

export const useRegister = () => {

    const navigate = useNavigate()

    const registerMutation = useMutation({
        mutationFn: async (registerData) => {
            const response = await authService.register(registerData);
            return response
        },

        onSuccess: (data) => {
            localStorage.setItem('accessToken', data?.accessToken)
            navigate('/')
        },

        onError: (error) => {
            console.log('Registration failed', error);
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault()

        const formData = new FormData(e.target)

        const registerData = {
            login: formData.get('login') || '',
            email: formData.get('email') || '',
            password: formData.get('password') || ''
        }

        registerMutation.mutate(registerData)

        e.target.reset()
    }

    return {
        handleSubmit,
        isPending: registerMutation.isPending
    }
}