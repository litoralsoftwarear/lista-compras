import { API_URL } from "@/config/api.config"
import IStore from "@/interfaces/Store.interface"
import axios from "axios"

interface IUpdateStore {
    token: string
    id: number
    name: string
    image: string
    description?: string
}

const updateStore = async ({ token, id, ...data }: IUpdateStore): Promise<IStore> => {
    try {
        const res = await axios.put(`${API_URL}/stores/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return res.data.payload
    } catch (error) {
        throw error
    }
}

export default updateStore