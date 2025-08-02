import { API_URL } from "@/config/api.config"
import IStore from "@/interfaces/Store.interface"
import axios from "axios"

interface ICreateStore {
    token: string
    name: string
    image: string
    description?: string
}

const createStore = async ({ token, ...data }: ICreateStore): Promise<IStore> => {
    try {
        const res = await axios.post(`${API_URL}/stores`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return res.data.payload
    } catch (error) {
        throw error
    }
}

export default createStore