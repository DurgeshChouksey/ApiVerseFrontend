import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "@/lib/baseQueryWithReauth";

export const analyticsApi = createApi({
  reducerPath: "analyticsApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Analytics"],

  endpoints: (builder) => ({
    getTrafficAnalytics: builder.query<any, { apiId: string; days: number }>({
        query: ({ apiId, days }) => `/api/v1/apis/${apiId}/analytics/traffic?days=${days}`,
        providesTags: ["Analytics"],
        keepUnusedDataFor: 120,
    }),

    getUserAnalytics: builder.query<any, { apiId: string, days: number }>({
        query: ({apiId, days}) => `/api/v1/apis/${apiId}/analytics/users?days=${days}`,
        providesTags: ["Analytics"],
        keepUnusedDataFor: 120,
    })
  }),
});

export const { useGetTrafficAnalyticsQuery, useGetUserAnalyticsQuery } = analyticsApi;
