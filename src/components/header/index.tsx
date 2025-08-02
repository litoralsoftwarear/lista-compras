"use client"

import { LogOut, Settings, ShoppingCart, User } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { useAppDispatch, useAppSelector } from "@/store"
import { setToken } from "@/store/features/tokenSlice"
import StoreCreationForm from "@/domain/stores/components/store-creation-form"
import { useEffect, useState } from "react"
import IUser from "@/domain/users/interfaces/User.interface"
import getUser from "@/domain/users/services/getUser.service"
import { toast } from "react-toastify"

const Header = () => {
    const token = useAppSelector(state => state.token)
    const dispatch = useAppDispatch()

    const [user, setUser] = useState<IUser>({} as IUser)

    const logout = () => dispatch(setToken(null))

    useEffect(() => {
        if (token) {
            getUser({ token })
            .then((user) => setUser(user))
            .catch((error) => toast.error(error?.response?.data?.message || "Ha ocurrido un error inesperado 😿"))
        }
    }, [token])

    if (!token) return null

    return (
        <header className="bg-white border-b border-gray-200 px-5 md:px-10 lg:px-20 py-4 mb-10">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="bg-indigo-100 p-2 rounded-full">
                        <ShoppingCart className="h-4 w-4 text-indigo-500" />
                    </div>
                    <h1 className="text-xl text-indigo-400">Lista de Compras</h1>
                </div>
                <div className="flex gap-5 items-center">
                    <StoreCreationForm
                        trigger={<Button className="bg-indigo-500 hover:bg-indigo-700">Nueva tienda</Button>}
                    />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src="/placeholder-user.jpg" alt="Usuario" />
                                    <AvatarFallback>U</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="end" forceMount>
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">{user.name}</p>
                                    <p className="text-xs leading-none text-muted-foreground">@{user.username}</p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {/* <DropdownMenuItem>
                                <User className="mr-2 h-4 w-4" />
                                <span>Perfil</span>
                            </DropdownMenuItem> */}
                            {/* <DropdownMenuItem>
                                <Settings className="mr-2 h-4 w-4" />
                                <span>Configuración</span>
                            </DropdownMenuItem> */}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={logout}>
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Cerrar sesión</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    )
}

export default Header