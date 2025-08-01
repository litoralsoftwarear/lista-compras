import IStore from "@/interfaces/Store.interface"
import { useAppSelector } from "@/store"
import { useEffect, useState } from "react"

const useCurrentStore = () => {
    const storeId = useAppSelector(state => state.storeSelected)
    const [store, setStore] = useState<IStore | null>(null)
    const stores = useAppSelector(state => state.stores)

    useEffect(() => {
        const foundShop = stores.find((data) => data.id === storeId)
        setStore(foundShop || null)
    }, [stores, storeId])

    return store
}

export default useCurrentStore