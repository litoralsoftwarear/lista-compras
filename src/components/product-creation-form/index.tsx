import { DialogTitle } from "@radix-ui/react-dialog"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "../ui/dialog"
import { useState } from "react"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { useAppDispatch } from "@/store"
import { addProduct } from "@/domain/stores/features/storesSlice"
import IStore from "@/interfaces/Store.interface"
import { productCreationFormData, ProductCreationFormData } from "@/schemas"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

const ProductCreationForm: React.FC<{ store: IStore }> = ({ store }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: zodResolver(productCreationFormData)
    })
    const [isOpen, setIsOpen] = useState(false)
    const dispatch = useAppDispatch()

    const onSave = (data: ProductCreationFormData) => {
        dispatch(addProduct({
            storeId: store.id,
            product: {
                ...data,
                id: (store.products[store.products.length - 1]?.id || 0) + 1,
                storeId: store.id,
                price: Number(data.price),
                quantity: Number(data.quantity),
                createdAt: new Date()
            }
        }))

        setIsOpen(false)
        reset()
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button>Agregar producto</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Agregar producto</DialogTitle>
                </DialogHeader>
                <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSave)}>
                    <div className="space-y-2">
                        <Input {...register("name")} placeholder="Nombre del producto" />
                        {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <Input {...register("image")} placeholder="Imágen del producto (URL)" />
                        {errors.image && <p className="text-sm text-red-500">{errors.image.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <Textarea className="resize-none" {...register("description")} placeholder="Descripción del producto" ></Textarea>
                        {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <Input type="number" {...register("price", { setValueAs: (value) => Number(value) })} placeholder="Precio" />
                        {errors.price && <p className="text-sm text-red-500">{errors.price.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <Input type="number" {...register("quantity", { setValueAs: (value) => Number(value) })} placeholder="Cantidad" />
                        {errors.quantity && <p className="text-sm text-red-500">{errors.quantity.message}</p>}
                    </div>
                    <Button type="submit">Guardar</Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default ProductCreationForm