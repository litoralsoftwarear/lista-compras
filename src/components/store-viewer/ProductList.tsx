import IShop from "@/interfaces/Shop.interface"
import { useAppSelector } from "@/store"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { ShoppingBasket } from "lucide-react"
import ProductCreationForm from "../product-creation-form"
import ProductItem from "../product-item"
import useCurrentStore from "@/hooks/useCurrentStore"

const ProductList = () => {
    const store = useCurrentStore()

    if (!store) return null

    return (
        <Card>
            <CardHeader className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2 text-zinc-700 text-xl font-semibold">
                    <ShoppingBasket className="text-blue-500" /> Productos
                </CardTitle>
                <ProductCreationForm store={store} />
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-2">
                    {store.products.map((data) => (<ProductItem key={data.id} data={data} />))}
                </div>
            </CardContent>
        </Card>
    )
}

export default ProductList