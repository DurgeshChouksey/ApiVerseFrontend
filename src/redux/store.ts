import { configureStore } from '@reduxjs/toolkit'
import userSlice from '../features/user/userSlice'
import apisSlice from '../features/apis/apisSlice'
import apiSlice from '../features/apis/apiSlice'
import endpointSlice from '../features/endpoints/endpointSlice'
import endpointTestSlice from "../features/endpoints/endpointTestSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    apis: apisSlice,
    api: apiSlice,
    endpoints: endpointSlice,
    endpointTest: endpointTestSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
