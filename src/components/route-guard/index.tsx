"use client"

import { useAppSelector } from "@/store"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"


const RouteGuard = ({ children }: { children: React.ReactNode }) => {
    const token = useAppSelector(state => state.token)
    const path = usePathname()
    const router = useRouter()
    const [isAuthorized, setIsAuthorized] = useState(false)

    useEffect(() => {
        if (!token && (path !== "/" && path !== "/register" )) {
            setIsAuthorized(false)
            router.push("/")
            return
        }

        if (token && path !== "/home") {
            setIsAuthorized(false)
            router.push("/home")
            return
        }

        setIsAuthorized(true)
    }, [token, path])

    if (!isAuthorized) return null

    return children
}

export default RouteGuard