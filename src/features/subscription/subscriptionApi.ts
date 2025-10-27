
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "@/lib/baseQueryWithReauth";

export const subscriptionApi = createApi({
  reducerPath: "subscriptionApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Subscription"],
  endpoints: (builder) => ({
    // ✅ Check subscription
    checkSubscription: builder.query({
      query: (apiId) => `/api/v1/apis/${apiId}/subscribed`,
      providesTags: ["Subscription"],
    }),

    // ✅ Subscribe to API
    subscribeToApi: builder.mutation<any, { apiId: string; plan: string }>({
      query: ({ apiId, plan }) => ({
        url: `/api/v1/apis/${apiId}/subscribe`,
        method: "POST",
        body: { plan },
      }),
      invalidatesTags: ["Subscription"],
    }),

    // ✅ Get API key
    getApiKey: builder.query<{ apiKey: string }, string>({
      query: (apiId) => `/api/v1/apis/${apiId}/apikey`,
      providesTags: ["Subscription"],
    }),

    // ✅ Generate new API key
    generateApiKey: builder.mutation<{ apiKey: string }, string>({
      query: (apiId) => ({
        url: `/api/v1/apis/${apiId}/apikey`,
        method: "POST",
      }),
      invalidatesTags: ["Subscription"],
    }),
  }),
});

export const {
  useCheckSubscriptionQuery,
  useSubscribeToApiMutation,
  useGetApiKeyQuery,
  useGenerateApiKeyMutation,
} = subscriptionApi;
