import { API_URL } from "@/config/api.config"
import axios from "axios"

interface ILogin {
    username: string
    password: string
}
export const login = async ({ username, password }: ILogin): Promise<string> => {
    try {
        const res = await axios.post(`${API_URL}/auth/login`, { username, password })

        return res.data.data.token
    } catch (error) {
        throw error
    }
}

interface IRegister {
    name: string
    username: string
    password: string
}

export const register = async (data: IRegister): Promise<string> => {
    try {
        const res = await axios.post(`${API_URL}/auth/register`, data)

        return res.data.data.token
    } catch (error) {
        throw error
    }
}