import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "@/lib/baseQueryWithReauth";

export const docsApi = createApi({
  reducerPath: "docsApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Docs"],
  endpoints: (builder) => ({
    getDocs: builder.query<{ content: string }, string>({
      query: (apiId) => ({
        url: `/api/v1/apis/${apiId}/docs`,
        method: "GET",
      }),
      providesTags: (result, error, apiId) => [{ type: "Docs", id: apiId }],
    }),

    saveDocs: builder.mutation<{ message: string }, { apiId: string; content: string }>({
      query: ({ apiId, content }) => ({
        url: `/api/v1/apis/${apiId}/docs`,
        method: "POST",
        data: { content },
      }),
      invalidatesTags: (result, error, { apiId }) => [{ type: "Docs", id: apiId }],
    }),
  }),
});

export const { useGetDocsQuery, useSaveDocsMutation } = docsApi;
