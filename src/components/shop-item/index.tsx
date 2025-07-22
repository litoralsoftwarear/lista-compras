"use client"

import Image from "next/image"
import { Card, CardContent } from "../ui/card"
import IShop from "@/interfaces/Shop.interface"
import { useAppSelector } from "@/store"

interface ShopItemProps {
    data: IShop
    onSelect?: (id: number) => void
    isSelected?: boolean
}

const ShopItem: React.FC<ShopItemProps> = ({ data, onSelect = () => { } }) => {
    const shopId = useAppSelector(state => state.storeSelected)
    
    return (
        <Card onClick={() => onSelect(data.id)} className={`${shopId === data.id ? "bg-blue-500 text-white" : " text-fore"}`}>
            <CardContent className="flex items-center gap-4">
                <Image className="rounded-full" src={data.image} alt={data.name} width={60} height={60} />
                <div className="">
                    <p className={`text-lg tex-semibold`}>{data.name}</p>
                    <p className="text-sm">{data.description}</p>
                </div>
            </CardContent>
        </Card>
    )
}

export default ShopItem