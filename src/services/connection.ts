import axios from 'axios'

export const connection = axios.create({
    baseURL: import.meta.env.VITE_BASE_API_URL,
})

connection.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem('Token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export const ping = async () => {
    try {
        const response = await connection.get('/')
        return response.data
    } catch (error) {
        console.error('Error pinging the server:', error)
        throw error
    }
}