import { createSlice } from "@reduxjs/toolkit"

const initialState: string | null = null

const tokenSlice = createSlice({
    name: "token",
    initialState: initialState as string | null,
    reducers: {
        setToken: (_, { payload }) => payload,
    },
})


export const { setToken } = tokenSlice.actions
export default tokenSlice.reducer