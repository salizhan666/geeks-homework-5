import { $mainApi } from "../api-instance"

export const authService = {
    login: async (loginData) => {
        const response = await $mainApi.post('/auth/sign-in', loginData)
        return response.data
    },

    register: async (registerData) => {
        const response = await $mainApi.post('/auth/sign-up', registerData)
        return response.data
    },

    logout: async () => {
        return await $mainApi.post('/auth/logout')
    },

    refresh: async () => {
        const response = await $mainApi.post('auth/refresh')
        return response.data
    }
}