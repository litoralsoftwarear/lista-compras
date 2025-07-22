"use client"

import { combineReducers } from "@reduxjs/toolkit"
import storesReducer from "./features/storesSlice"
import storeSelectedReducer from "./features/storeSelectedSlice"

const reducers = combineReducers({
    stores: storesReducer,
    storeSelected: storeSelectedReducer
})

export default reducers