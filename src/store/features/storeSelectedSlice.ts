import { createSlice } from "@reduxjs/toolkit";

const initialState = null

const storeSelectedSlice = createSlice({
    name: "storeSelected",
    initialState: initialState as number | null,
    reducers: {
        setStoreSelected: (_, action) => action.payload
    }
})

export const { setStoreSelected } = storeSelectedSlice.actions
export default storeSelectedSlice.reducer