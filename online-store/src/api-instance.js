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

$authApi.interceptors.response.use(
    (config) => config,
    async (error) => {

        const currentRequest = error.config

        if (error.response.status == 401) {
            try {
                const { data } = await $mainApi.post('/auth/refresh');
                localStorage.setItem('accessToken', data.accessToken);

                return $authApi.request(currentRequest);
            } catch (err) {
                console.error(err.message);
            }
        }

        throw error
    }
)

export { $mainApi, $authApi }