import React, { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Edit } from "lucide-react"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ProductCreationFormData, productCreationFormData } from "@/schemas"
import { useAppDispatch } from "@/store"
import { updateProduct } from "@/store/features/storesSlice"
import IProduct from "@/interfaces/Product.interface"

const ProductUpdateForm: React.FC<{ product: IProduct }> = ({ product }) => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: zodResolver(productCreationFormData)
    })

    const dispatch = useAppDispatch()

    const [isOpen, setIsOpen] = useState(false)

    const onSave = (data: ProductCreationFormData) => {
        console.log(data)
        dispatch(updateProduct({
            storeId: product.storeId,
            productId: product.id,
            data
        }))

        setIsOpen(false)
    }

    useEffect(() => {
        setValue("name", product.name)
        setValue("image", product.image)
        setValue("description", product.description)
        setValue("price", product.price)
        setValue("quantity", product.quantity)
    }, [product])

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <button><Edit size={16} /></button>
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

export default ProductUpdateForm