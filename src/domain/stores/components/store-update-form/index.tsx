import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "../../../../components/ui/dialog"
import { Edit } from "lucide-react"
import { Input } from "../../../../components/ui/input"
import { useForm } from "react-hook-form"
import useCurrentStore from "@/hooks/useCurrentStore"
import { zodResolver } from "@hookform/resolvers/zod"
import { Textarea } from "../../../../components/ui/textarea"
import { Button } from "../../../../components/ui/button"
import React, { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/store"
import { updateStore as updateStoreAction } from "@/domain/stores/features/storesSlice"
import { StoreSchema, storeSchema } from "../../schemas"
import updateStore from "../../services/updateStore.service"
import IStore from "@/interfaces/Store.interface"
import { toast } from "react-toastify"

const StoreUpdateForm: React.FC<{ data: IStore, trigger?: React.ReactNode }> = ({ data, trigger }) => {
    const token = useAppSelector(state => state.token)

    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: zodResolver(storeSchema),
    })

    const dispatch = useAppDispatch()

    const [isOpen, setIsOpen] = useState(false)
    const [isPending, setIsPending] = useState(false)

    const onSave = (formData: StoreSchema) => {
        if (!token) return

        setIsPending(true)
        updateStore({ token, id: data?.id, ...formData })
            .then((store) => {
                dispatch(updateStoreAction({ storeId: data?.id, data: store }))
                setIsOpen(false)
                toast.success("¡Tienda actualizada!")
            })
            .catch((error) => toast.error(error?.response?.data?.message || "Ha ocurrido un error inesperado 😿"))
            .finally(() => setIsPending(false))


    }

    useEffect(() => {
        if (data) {
            setValue("name", data.name)
            setValue("image", data.image)
            setValue("description", data.description)
        }
    }, [data])

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {trigger || <button className="text-blue-500"><Edit size={17} /></button>}
            </DialogTrigger>

            <DialogContent>
                <DialogTitle>Editar Información</DialogTitle>
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
                    <Button type="submit" disabled={isPending}>Guardar</Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default StoreUpdateForm