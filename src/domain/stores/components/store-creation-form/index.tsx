"use client"

import React, { useState } from "react"
import { Button } from "../../../../components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../../../components/ui/dialog"
import { Input } from "../../../../components/ui/input"
import { Textarea } from "../../../../components/ui/textarea"
import { useAppDispatch, useAppSelector } from "@/store"
import { addStore } from "@/domain/stores/features/storesSlice"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { StoreCreationFormData, storeCreationFormData } from "@/schemas"
import createStore from "../../services/createStore.service"
import { toast } from "react-toastify"

const StoreCreationForm: React.FC<{ trigger?: React.ReactNode }> = ({ trigger }) => {
    const token = useAppSelector(state => state.token)
    const { register, reset, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(storeCreationFormData)
    })

    const [isPending, setIsPending] = useState(false)

    const stores = useAppSelector(state => state.stores)

    const [isOpen, setIsOpen] = useState(false)
    const dispatch = useAppDispatch()


    const onSave = (data: StoreCreationFormData) => {
        if (!token) return

        setIsPending(true)

        createStore({ token, ...data })
            .then((store) => {
                dispatch(addStore(store))

                setIsOpen(false)
                reset()
            })
            .catch((error) => toast.error(error?.reponse?.data?.message || "Error inesperado 😿"))
            .finally(() => setIsPending(false))

    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {trigger || <Button>Nueva tienda</Button>}
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
                    <Button type="submit" disabled={isPending}>Crear</Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default StoreCreationForm