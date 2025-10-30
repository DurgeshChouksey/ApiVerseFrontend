import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "@/lib/baseQueryWithReauth";

export const endpointsApi = createApi({
  reducerPath: "endpointsApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Endpoints"],
  endpoints: (builder) => ({
    // ✅ Get all endpoints for an API
    getEndpoints: builder.query<any, { apiId: string; filter?: string }>({
      query: ({ apiId, filter = "" }) => ({
        url: `/api/v1/apis/${apiId}/endpoints?filter=${filter}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map((endpoint: any) => ({
                type: "Endpoints" as const,
                id: endpoint.id,
              })),
              { type: "Endpoints", id: "LIST" },
            ]
          : [{ type: "Endpoints", id: "LIST" }],
    }),

    // ✅ Create a new endpoint
    createEndpoint: builder.mutation<any, { apiId: string; data: any }>({
      query: ({ apiId, data }) => ({
        url: `/api/v1/apis/${apiId}/endpoints`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: [{ type: "Endpoints", id: "LIST" }],
    }),

    // ✅ Update an existing endpoint
    updateEndpoint: builder.mutation<
      any,
      { apiId: string; endpointId: string; data: any }
    >({
      query: ({ apiId, endpointId, data }) => ({
        url: `/api/v1/apis/${apiId}/endpoints/${endpointId}`,
        method: "PATCH",
        body: data,
        credentials: "include",
      }),
    }),

    // ✅ Delete an endpoint
    deleteEndpoint: builder.mutation<any, { apiId: string; endpointId: string }>(
      {
        query: ({ apiId, endpointId }) => ({
          url: `/api/v1/apis/${apiId}/endpoints/${endpointId}`,
          method: "DELETE",
          credentials: "include",
        }),
        invalidatesTags: ({ endpointId }) => [
          { type: "Endpoints", id: endpointId },
          { type: "Endpoints", id: "LIST" },
        ],
      }
    ),
  }),
});

// ✅ Export hooks for all endpoints
export const {
  useGetEndpointsQuery,
  useCreateEndpointMutation,
  useUpdateEndpointMutation,
  useDeleteEndpointMutation,
} = endpointsApi;
