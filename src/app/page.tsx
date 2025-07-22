"use client"

import ShopCreationForm from "@/components/shop-creation-form";
import ShopItem from "@/components/shop-item";
import StoreViewer from "@/components/store-viewer";
import IShop from "@/interfaces/Shop.interface";
import { useAppDispatch, useAppSelector } from "@/store";
import { setStoreSelected } from "@/store/features/storeSelectedSlice";
import { useEffect, useState } from "react";

export default function Home() {
  const [isClient, setIsClient] = useState(false)

  const storeId = useAppSelector(state => state.storeSelected)
  const stores = useAppSelector(state => state.stores)
  const dispatch = useAppDispatch()

  const handleSelectStore = (data: IShop) => {
    dispatch(setStoreSelected(data.id === storeId ? null : data.id))
  }

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null

  return (
    <main className="min-h-screen bg-gray-100 py-20 px-70">
      <div className="grid grid-cols-6 h-full gap-10">
        <div className="col-span-2">
          <div className="flex flex-col gap-2">
            {stores.length > 0 && stores.map((data) => (<ShopItem key={data.id} onSelect={() => handleSelectStore(data)} data={data} />))}
            {stores.length === 0 && <p className="text-foreground text-center">No hay tiendas agregadas</p>}

            <ShopCreationForm />
          </div>
        </div>
        <div className="col-span-4">
          <StoreViewer />
        </div>
      </div>
    </main>
  );
}
