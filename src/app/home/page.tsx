"use client"

import Header from "@/components/header";
import StoreCreationForm from "@/domain/stores/components/store-creation-form";
import ShopItem from "@/components/store-item";
import StoreViewer from "@/components/store-viewer";
import StoreList from "@/domain/stores/components/store-list";
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
    <main className="flex flex-col bg-gray-100 px-5 md:px-10 lg:px-20 pb-20">
      <StoreList />
    </main>
  );
}
