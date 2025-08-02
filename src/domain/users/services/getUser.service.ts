import { API_URL } from "@/config/api.config"
import axios from "axios"
import IUser from "../interfaces/User.interface"

const getUser = async ({ token }: { token: string }): Promise<IUser> => {
    try {
        const res = await axios.get(`${API_URL}/users`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return res.data.payload
    } catch (error) {
        throw error
    }
}

export default getUser