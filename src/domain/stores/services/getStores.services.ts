import { API_URL } from "@/config/api.config"
import IStore from "@/interfaces/Store.interface"
import axios from "axios"

const getStores = async ({ token }: { token: string }): Promise<IStore[]> => {
    try {
        const res = await axios.get(`${API_URL}/stores`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return res.data.payload
    } catch (error) {
        throw error
    }
}

export default getStores