import IShop from "@/interfaces/Shop.interface"
import { useAppSelector } from "@/store"
import { useEffect, useState } from "react"

const useCurrentStore = () => {
    const storeId = useAppSelector(state => state.storeSelected)
    const [store, setStore] = useState<IShop | null>(null)
    const stores = useAppSelector(state => state.stores)

    useEffect(() => {
        const foundShop = stores.find((data) => data.id === storeId)
        setStore(foundShop || null)
    }, [stores, storeId])

    return store
}

export default useCurrentStore