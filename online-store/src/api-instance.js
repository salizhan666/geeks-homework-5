import axios from 'axios'

const createAxios = () => axios.create({
    baseURL: 'https://edu-market.online/api/v1',
})

const $mainApi = createAxios();
const $authApi = createAxios();

$authApi.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('accessToken')
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`
        }

        return config
    }
)

export { $mainApi, $authApi }