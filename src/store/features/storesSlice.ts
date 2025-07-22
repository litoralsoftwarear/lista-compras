"use client"

import IShop from "@/interfaces/Shop.interface"
import { createSlice } from "@reduxjs/toolkit"

const initialState: IShop[] = []

const storesSlice = createSlice({
    name: "stores",
    initialState,
    reducers: {
        addStore: (state, { payload }) => {
            state.push(payload)
        },
        addProduct: (state, { payload }) => {
            const shop = state.find((shop) => shop.id === payload.shopId)

            if (shop) {
                shop.products.push(payload.product)
            }
        },
        editProduct: (state, { payload }) => {
            const shop = state.find((shop) => shop.id === payload.shopId)

            if (shop) {
                const product = shop.products.find((product) => product.id === payload.productId)
                if (product) {
                    Object.assign(product, payload.data)
                }
            }
        },
        removeProduct: (state, { payload }) => {
            const shop = state.find((shop) => shop.id === payload.shopId)

            if (shop) {
                shop.products = shop.products.filter((product) => product.id !== payload.productId)
            }
        }
    }
})

export const { addStore, addProduct, editProduct, removeProduct } = storesSlice.actions
export default storesSlice.reducer