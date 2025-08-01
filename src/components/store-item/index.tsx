"use client"

import Image from "next/image"
import { Card, CardContent } from "../ui/card"
import IStore from "@/interfaces/Store.interface"
import { useAppSelector } from "@/store"
import RemoveStore from "./RemoveStore"

interface ShopItemProps {
    data: IStore
    onSelect?: (id: number) => void
    isSelected?: boolean
}

const ShopItem: React.FC<ShopItemProps> = ({ data, onSelect = () => { } }) => {
    const storeId = useAppSelector(state => state.storeSelected)

    return (
        <Card onClick={() => onSelect(data.id)} className={`${storeId === data.id ? "bg-blue-500 text-white" : " text-foreground"} group`}>
            <CardContent className="flex items-center gap-4">
                <Image className="rounded-full" src={data.image} alt={data.name} width={60} height={60} />
                <div className="">
                    <p className={`text-lg tex-semibold`}>{data.name}</p>
                    <p className="text-sm">{data.description}</p>
                </div>
                <RemoveStore data={data} />
            </CardContent>
        </Card>
    )
}

export default ShopItem