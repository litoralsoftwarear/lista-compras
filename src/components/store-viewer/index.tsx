import { Store } from "lucide-react"
import { Card, CardContent } from "../ui/card"
import ProductList from "./ProductList"
import StoreInfo from "./StoreInfo"
import { useAppSelector } from "@/store"

const StoreViewer = () => {
    const storeId = useAppSelector(state => state.storeSelected)

    if (!storeId) return (
        <Card className="h-full">
            <CardContent className="flex-auto flex flex-col gap-2 items-center justify-center">
                <div className="h-[50px] w-[50px] bg-blue-100 rounded-full flex items-center justify-center">
                    <Store className="text-blue-500" />
                </div>
                <p className="text-gray-700 font-semibold text-xl">Seleccione una tienda</p>
                <p className="text-gray-500">Selecciona una tienda para poder ver su información detallada</p>
            </CardContent>
        </Card>
    )

    return (
        <div className="flex flex-col gap-5">
            <StoreInfo />
            <ProductList />
        </div>
    )
}


export default StoreViewer