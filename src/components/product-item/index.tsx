import IProduct from "@/interfaces/Product.interface"
import Image from "next/image"
import React from "react"
import ProductQuantity from "./ProductQuantity"
import { formatNumbers } from "@/lib/utils"
import RemoveProduct from "./RemoveProduct"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"

const ProductItem: React.FC<{ data: IProduct }> = ({ data }) => {
    return (
        <div
            key={data.id}
            className="group flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 border border-transparent hover:border-gray-200"
        >
            {/* Imagen del producto */}
            <div className="w-16 h-12 relative flex-shrink-0 rounded-md overflow-hidden shadow-sm">
                <Image
                    src={data.image || "/placeholder.svg?height=48&width=64&query=product"}
                    alt={data.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-200"
                />
            </div>

            {/* Información del producto */}
            <div className="flex-1 min-w-0">
                <Tooltip>
                    <TooltipTrigger asChild className="overflow-hidden">
                        <h3 className="font-medium text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                            {data.name}
                        </h3>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p className="text-lg">{data.name}</p>
                    </TooltipContent>
                </Tooltip>
                <p className="text-sm text-blue-600 italic truncate opacity-80">{data.description}</p>
                <p className="text-xs text-gray-500 mt-1">
                    $ {formatNumbers(data.price)} c/u
                </p>
            </div>

            {/* Controles de cantidad */}
            <ProductQuantity data={data} />


            {/* Precio total y eliminar */}
            <div className="flex items-center gap-3" >
                <div className="text-right">
                    <div className="font-semibold text-gray-900">
                        $ {formatNumbers(data.price * data.quantity)}
                    </div>
                </div>

                <RemoveProduct data={data} />
            </div>
        </div >
    )
}

export default ProductItem