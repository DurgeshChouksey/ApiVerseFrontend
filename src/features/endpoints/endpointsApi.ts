import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "@/lib/baseQueryWithReauth";

export const endpointsApi = createApi({
  reducerPath: "endpointsApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Endpoints"],
  endpoints: (builder) => ({
    getEndpoints: builder.query<any, { apiId: string; filter?: string }>({
      query: ({ apiId, filter = "" }) => ({
        url: `/api/v1/apis/${apiId}/endpoints?filter=${filter}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.map((endpoint: any) => ({ type: "Endpoints" as const, id: endpoint.id })),
              { type: "Endpoints", id: "LIST" },
            ]
          : [{ type: "Endpoints", id: "LIST" }],
    }),

    // 🔹 New mutation to test an endpoint
    testEndpoint: builder.mutation<any, { apiId: string; endpointId: string; payload: any; headers: any }>({
      query: ({ apiId, endpointId, payload, headers }) => ({
        url: `/api/v1/apis/${apiId}/endpoints/test/${endpointId}`,
        method: "POST",
        data: payload,
        headers: headers,
      }),
    }),
  }),
});

export const { useGetEndpointsQuery, useTestEndpointMutation } = endpointsApi;
