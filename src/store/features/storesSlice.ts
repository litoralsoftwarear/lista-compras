import IStore from "@/interfaces/Store.interface"
import { createSlice } from "@reduxjs/toolkit"

const initialState: IStore[] = []

const storesSlice = createSlice({
    name: "stores",
    initialState,
    reducers: {
        addStore: (state, { payload }) => {
            state.push(payload)
        },
        updateStore: (state, { payload }) => {
            const store = state.find((store) => store.id === payload.storeId)
            if (store) {
                Object.assign(store, payload.data)
            }
        },
        removeStore: (state, { payload }) => state.filter((store) => store.id !== payload.storeId),
        addProduct: (state, { payload }) => {
            const store = state.find((store) => store.id === payload.storeId)

            if (store) {
                store.products.push(payload.product)
            }
        },
        updateProduct: (state, { payload }) => {
            const store = state.find((store) => store.id === payload.storeId)

            if (store) {
                const product = store.products.find((product) => product.id === payload.productId)
                if (product) {
                    Object.assign(product, payload.data)
                }
            }

        },
        removeProduct: (state, { payload }) => {
            const store = state.find((store) => store.id === payload.storeId)

            if (store) {
                store.products = store.products.filter((product) => product.id !== payload.productId)
            }
        }
    }
})

export const { addStore, updateStore, removeStore, addProduct, updateProduct, removeProduct } = storesSlice.actions
export default storesSlice.reducer