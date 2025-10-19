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

  }),
});

export const { useGetEndpointsQuery } = endpointsApi;
