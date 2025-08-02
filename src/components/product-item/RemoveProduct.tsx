import IProduct from "@/interfaces/Product.interface"
import { useAppDispatch } from "@/store"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Button } from "../ui/button"
import { X } from "lucide-react"
import Image from "next/image"
import { removeProduct } from "@/domain/stores/features/storesSlice"
import { useState } from "react"

const RemoveProduct = ({ data }: { data: IProduct }) => {
    const [isOpen, setIsOpen] = useState(false)
    const dispatch = useAppDispatch()

    const handleRemoveProduct = () => {
        dispatch(removeProduct({ productId: data.id, storeId: data.storeId }))
    }
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0 text-gray-400 hover:text-red-600 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all"
                >
                    <X className="w-4 h-4" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Eliminar producto</DialogTitle>
                </DialogHeader>
                <div className="flex justify-center items-center gap-2">
                    <div className="w-16 h-12 relative flex-shrink-0 rounded-md overflow-hidden shadow-sm">
                        <Image
                            src={data.image || "/placeholder.svg?height=48&width=64&query=product"}
                            alt={data.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                    </div>
                    <p className="text-sm text-gray-500">
                        ¿Estas seguro que quieres eliminar el producto <b>{data.name}</b>?
                    </p>
                    <Button className="bg-red-500" onClick={handleRemoveProduct}>Eliminar</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default RemoveProduct