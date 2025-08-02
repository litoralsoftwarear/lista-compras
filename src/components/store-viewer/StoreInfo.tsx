import { Box, DollarSign, Store } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { formatNumbers } from "@/lib/utils"
import useCurrentStore from "@/hooks/useCurrentStore"
import StoreUpdateForm from "../../domain/stores/components/store-update-form"

const StoreInfo = () => {
    const store = useCurrentStore()

    if (!store) return null

    return (
        <Card>
            <CardHeader className="flex justify-between items-center">
                <div className="flex flex-col">
                    <CardTitle className="flex items-center gap-2 text-zinc-700 text-xl font-semibold">
                        <Store className="text-blue-500" /> {store.name} <StoreUpdateForm />
                    </CardTitle>
                    <CardDescription>{store.description}</CardDescription>
                </div>
                <span className="bg-gray-100 px-2 py-1 rounded-full text-foreground text-sm">{store.products.length > 1 ? `${store.products.length} productos` : `${store.products.length} producto`}</span>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-5">
                    <div className="col-span-1 bg-blue-100 p-5 flex items-center gap-5 rounded-lg">
                        <div className="w-[50px] h-[50px] rounded-full bg-blue-500 flex items-center justify-center">
                            <Box className="text-white" />
                        </div>
                        <div className="flex flex-col">
                            <p className="text-blue-700 text-xl font-bold">{store.products.length}</p>
                            <p className="text-blue-700">Productos</p>
                        </div>
                    </div>
                    <div className="col-span-1 bg-green-100 p-5 flex items-center gap-5 rounded-lg">
                        <div className="w-[50px] h-[50px] rounded-full bg-green-500 flex items-center justify-center">
                            <DollarSign className="text-white" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-green-700 font-bold text-xl">$ {formatNumbers(store.products.reduce((acc, product) => acc + product.price * product.quantity, 0))}</p>
                            <p className="text-green-700 font-semibold">Valor Final</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default StoreInfo