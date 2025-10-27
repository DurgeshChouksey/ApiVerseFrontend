import { configureStore } from '@reduxjs/toolkit';

// Existing slices
import endpointTestSlice from "../features/endpoints/endpointTestSlice";
import searchReducer from '@/features/search/searchSlice';

// RTK Query API slices
import { userApi } from '../features/user/userApi';
import { apisApi } from '../features/apis/apisApi';
import { endpointsApi } from "@/features/endpoints/endpointsApi";
import { subscriptionApi } from "@/features/subscription/subscriptionApi";
import { docsApi } from "@/features/docs/docsApi";
import { analyticsApi } from "@/features/analytics/analyticsApi";

export const store = configureStore({
  reducer: {
    // Existing slices
    search: searchReducer,
    endpointTest: endpointTestSlice,

    // RTK Query reducers
    [userApi.reducerPath]: userApi.reducer,
    [apisApi.reducerPath]: apisApi.reducer,
    [endpointsApi.reducerPath]: endpointsApi.reducer,
    [subscriptionApi.reducerPath]: subscriptionApi.reducer,
    [docsApi.reducerPath]: docsApi.reducer,
    [analyticsApi.reducerPath]: analyticsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(apisApi.middleware)
      .concat(endpointsApi.middleware)
      .concat(subscriptionApi.middleware)
      .concat(docsApi.middleware)
      .concat(analyticsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
