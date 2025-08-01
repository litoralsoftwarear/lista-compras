"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { useAppDispatch, useAppSelector } from "@/store"
import { addStore } from "@/store/features/storesSlice"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ShopCreationFormData, shopCreationFormData } from "@/schemas"

const ShopCreationForm = () => {
    const { register, reset, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(shopCreationFormData)
    })

    const stores = useAppSelector(state => state.stores)

    const [isOpen, setIsOpen] = useState(false)
    const dispatch = useAppDispatch()


    const onSave = (data: ShopCreationFormData) => {
        dispatch(addStore({
            ...data,
            id: (stores[stores.length - 1]?.id || 0) + 1,
            createdAt: new Date(),
            products: []
        }))

        setIsOpen(false)
        reset()
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button onClick={() => setIsOpen(true)}>Agregar tienda</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Agregar tienda</DialogTitle>
                </DialogHeader>
                <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSave)}>
                    <div className="space-y-2">
                        <Input type="text" {...register("name")} placeholder="Nombre de la tienda" />
                        {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <Input type="text" {...register("image")} placeholder="Imágen de la tienda (URL)" />
                        {errors.image && <p className="text-sm text-red-500">{errors.image.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <Textarea className="resize-none" {...register("description")} placeholder="Descripción de la tienda"></Textarea>
                        {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
                    </div>
                    <Button type="submit">Guardar</Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default ShopCreationForm