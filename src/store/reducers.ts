import { combineReducers } from "@reduxjs/toolkit"
import storesReducer from "./features/storesSlice"
import storeSelectedReducer from "./features/storeSelectedSlice"
import tokenReducer from "./features/tokenSlice"

const reducers = combineReducers({
    stores: storesReducer,
    storeSelected: storeSelectedReducer,
    token: tokenReducer
})

export default reducers