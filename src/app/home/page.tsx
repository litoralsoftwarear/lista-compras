"use client"

import Header from "@/components/header";
import StoreCreationForm from "@/components/store-creation-form";
import ShopItem from "@/components/store-item";
import StoreViewer from "@/components/store-viewer";
import IStore from "@/interfaces/Store.interface";
import { useAppDispatch, useAppSelector } from "@/store";
import { setStoreSelected } from "@/store/features/storeSelectedSlice";
import { useEffect, useState } from "react";

export default function Home() {
  const [isClient, setIsClient] = useState(false)

  const storeId = useAppSelector(state => state.storeSelected)
  const stores = useAppSelector(state => state.stores)
  const dispatch = useAppDispatch()

  const handleSelectStore = (data: IStore) => {
    dispatch(setStoreSelected(data.id === storeId ? null : data.id))
  }

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null

  return (
    <main className="min-h-screen space-y-10 bg-gray-100">
      <Header />
      <div className="grid grid-cols-6 h-full gap-10 px-20">
        <div className="col-span-2">
          <div className="flex flex-col gap-2">
            {stores.length > 0 && stores.map((data) => (<ShopItem key={data.id} onSelect={() => handleSelectStore(data)} data={data} />))}
            {stores.length === 0 && <p className="text-foreground text-center">No hay tiendas agregadas</p>}

            <StoreCreationForm />
          </div>
        </div>
        <div className="col-span-4">
          <StoreViewer />
        </div>
      </div>
    </main>
  );
}
