"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { User, Lock, Sparkles, ArrowRight } from "lucide-react"
import { loginFormData, LoginFormData } from "@/schemas"
import { useAppDispatch } from "@/store"
import { login } from "@/services/auth.services"
import { toast } from "react-toastify"
import { setToken } from "@/store/features/tokenSlice"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"
import Link from "next/link"

const AuthPage = () => {
    const [isRequesting, setIsRequesting] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginFormData),
    })
    const dispatch = useAppDispatch()

    const onAuth = (data: LoginFormData) => {
        setIsRequesting(true)
        login(data)
            .then((token) => {
                dispatch(setToken(token))
                toast.success("¡Inicio de sesión exitoso!")
            })
            .catch((error) => toast.error(error?.response?.data?.message || "Error intentando iniciar sesión"))
            .finally(() => setIsRequesting(false))
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
            {/* Elementos decorativos de fondo */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <Card className="w-full max-w-md relative backdrop-blur-sm bg-white/80 border-0 shadow-2xl shadow-blue-500/10 animate-in fade-in-0 zoom-in-95 duration-500">
                <CardHeader className="text-center pb-2">
                    <div className="mx-auto rounded-2xl flex items-center justify-center">
                        <Image className="object-cover" src={"/logo.png"} width={120} height={80} alt="litoral_software" />
                    </div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                        ¡Bienvenido de vuelta!
                    </h1>
                    <p className="text-gray-600">
                        Accede a tu cuenta para continuar
                    </p>
                </CardHeader>

                <CardContent className="space-y-6">
                    <form className="space-y-5" onSubmit={handleSubmit(onAuth)}>
                        <div className="space-y-2 group">
                            <Label className="text-sm font-medium text-gray-700 group-focus-within:text-indigo-500 transition-colors">
                                Usuario
                            </Label>
                            <div className="flex items-center relative">
                                <User className="absolute left-3 text-gray-400 w-4 h-4 group-focus-within:text-indigo-500 transition-colors" />
                                <Input
                                    type="text"
                                    {...register("username")}
                                    placeholder="user882"
                                    className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200 hover:border-gray-300"
                                />
                            </div>
                            {errors.username && (
                                <p className="text-sm text-red-500">
                                    {errors.username.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2 group">
                            <Label className="text-sm font-medium text-gray-700 group-focus-within:text-indigo-500 transition-colors">
                                Contraseña
                            </Label>
                            <div className="flex items-center relative">
                                <Lock className="absolute left-3 text-gray-400 w-4 h-4 group-focus-within:text-indigo-500 transition-colors" />
                                <Input
                                    type="password"
                                    {...register("password")}
                                    placeholder="••••••••••••"
                                    className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200 hover:border-gray-300"
                                />
                            </div>
                            {errors.password && (
                                <p className="text-sm text-red-500">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        <Button
                            disabled={isRequesting}
                            className="w-full h-12 bg-indigo-500 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none group"
                        >
                            {isRequesting ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Procesando...
                                </div>
                            ) : (
                                <div className="flex items-center gap-2 group-hover:gap-3 transition-all duration-200">
                                    Iniciar sesión
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                                </div>
                            )}
                        </Button>
                    </form>

                    <div className="text-center">
                        <Link href={"/register"} className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200 hover:underline">
                            Registrarse
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default AuthPage
