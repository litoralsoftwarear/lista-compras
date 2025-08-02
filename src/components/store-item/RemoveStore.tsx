import useCurrentStore from "@/hooks/useCurrentStore"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Button } from "../ui/button"
import { X } from "lucide-react"
import Image from "next/image"
import { useAppDispatch } from "@/store"
import { removeStore } from "@/domain/stores/features/storesSlice"
import IStore from "@/interfaces/Store.interface"

const RemoveStore: React.FC<{ data: IStore }> = ({ data }) => {
    const dispatch = useAppDispatch()

    const [isOpen, setIsOpen] = useState(false)

    const handleRemoveStore = () => {
        dispatch(removeStore({ storeId: data.id }))
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild className="ml-auto">
                <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-all"
                >
                    <X className="w-4 h-4" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Eliminar tienda</DialogTitle>
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
                        ¿Estas seguro que quieres eliminar la tienda <b>{data.name}</b>?
                    </p>
                    <Button className="bg-red-500" onClick={handleRemoveStore}>Eliminar</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default RemoveStore