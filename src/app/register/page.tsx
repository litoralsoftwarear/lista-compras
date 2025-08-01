"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RegisterFormData, registerFormData } from "@/schemas"
import { register as registerService } from "@/services/auth.services"
import { useAppDispatch } from "@/store"
import { setToken } from "@/store/features/tokenSlice"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"

const RegisterPage = () => {
    const [isRequesting, setIsRequesting] = useState(false)

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(registerFormData)
    })

    const dispatch = useAppDispatch()

    const onSubmit = (data: RegisterFormData) => {
        setIsRequesting(true)
        registerService(data)
            .then((token) => {
                console.log(token)
                dispatch(setToken(token))
                toast.success("¡Te has registrado correctamente!")
            })
            .catch((error) => toast.error(error?.response?.data?.message || "Error intentando iniciar sesión"))
            .finally(() => setIsRequesting(false))
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <Card className="w-[350px]">
                <CardContent className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                        <p className="text-xl text-zinc-700">Registrarte</p>
                        <p className="text-sm text-foreground">¡¡Registrate para ordenar tus compras!!</p>
                    </div>
                    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-2">
                            <Label>Nombre</Label>
                            <Input type="text" {...register("name")} placeholder="Pedro Salinas" />
                            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label>Usuario</Label>
                            <Input type="text" {...register("username")} placeholder="user882" />
                            {errors.username && <p className="text-sm text-red-500">{errors.username.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label>Contraseña</Label>
                            <Input type="password" {...register("password")} placeholder="************" />
                            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
                        </div>
                        <Button disabled={isRequesting}>{isRequesting ? "Procesando..." : "Entrar"}</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default RegisterPage