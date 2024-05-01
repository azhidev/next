import axios from "axios"

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API

export const setupAxios = (toast) => {
    axios.interceptors.request.use((config) => {
        const token = localStorage.getItem("access")
        if (token)
        config.headers.authorization = "Bearer " + token
        return config
    })
}