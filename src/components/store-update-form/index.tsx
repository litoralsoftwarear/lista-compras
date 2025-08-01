import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Edit } from "lucide-react"
import { Input } from "../ui/input"
import { useForm } from "react-hook-form"
import useCurrentStore from "@/hooks/useCurrentStore"
import { zodResolver } from "@hookform/resolvers/zod"
import { ShopCreationFormData, shopCreationFormData } from "@/schemas"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"
import { useEffect, useState } from "react"
import { useAppDispatch } from "@/store"
import { updateStore } from "@/store/features/storesSlice"

const StoreUpdateForm = () => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: zodResolver(shopCreationFormData),
    })

    const store = useCurrentStore()
    const dispatch = useAppDispatch()

    const [isOpen, setIsOpen] = useState(false)

    const onSave = (data: ShopCreationFormData) => {
        dispatch(updateStore({ storeId: store?.id, data }))

        setIsOpen(false)
    }

    useEffect(() => {
        if (store) {
            setValue("name", store.name)
            setValue("image", store.image)
            setValue("description", store.description)
        }
    }, [store])

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <button className="text-blue-500" onClick={() => setIsOpen(true)}><Edit size={17} /></button>
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
                    <Button type="submit">Guardar</Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default StoreUpdateForm