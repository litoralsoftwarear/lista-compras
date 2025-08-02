import { useAppDispatch, useAppSelector } from "@/store"
import { useEffect } from "react"
import getStores from "../../services/getStores.services"
import { setStoreList } from "../../features/storesSlice"
import { toast } from "react-toastify"
import StoreItem from "../store-item"

const StoreList = () => {
    const token = useAppSelector(state => state.token)
    const stores = useAppSelector(state => state.stores)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (token) {
            getStores({ token })
                .then((stores) => {
                    dispatch(setStoreList(stores))
                })
                .catch((error) => toast.error(error?.response?.data?.message || "Error inesperado 😿"))
        }
    }, [token])

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {stores.map((store) => <StoreItem key={store.id} data={store} />)}
        </div>
    )
}

export default StoreList