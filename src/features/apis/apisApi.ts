// src/features/apis/apisApi.ts
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '@/lib/baseQueryWithReauth';

export const apisApi = createApi({
  reducerPath: 'apisApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['PublicApis', 'MyApis', 'SubscribedApis', 'BookmarkedApis', 'Api'],
  endpoints: (builder) => ({
    // Fetch public APIs
    getPublicApis: builder.query<any, { page?: number; sort?: string; filter?: string }>({
      query: ({ page = 1, sort = '', filter = '' }) => ({
        url: `/api/v1/apis?page=${page}&sort=${sort}&filter=${filter}`,
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: [{ type: 'PublicApis' }],
      keepUnusedDataFor: 120, // keep cached data for 2 minutes instead of 60 seconds
    }),

    // Fetch user's APIs
    getMyApis: builder.query<any, { page?: number; sort?: string; filter?: string }>({
      query: ({ page = 1, sort = '', filter = '' }) => ({
        url: `/api/v1/apis/my?page=${page}&sort=${sort}&filter=${filter}`,
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: [{ type: 'MyApis' }],
    }),

    // Fetch subscribed APIs
    getSubscribedApis: builder.query<any, { page?: number; sort?: string; filter?: string }>({
      query: ({ page = 1, sort = '', filter = '' }) => ({
        url: `/api/v1/apis/subscribed?page=${page}&sort=${sort}&filter=${filter}`,
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: [{ type: 'SubscribedApis' }],
    }),

    // Fetch bookmarked APIs
    getBookmarkedApis: builder.query<any, {filter?: string}>({
      query: ({filter = ''}) => ({
        url: `/api/v1/apis/bookmarks?filter=${filter}`,
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: [{ type: 'BookmarkedApis' }],
    }),

    // Fetch a single API by ID
    getApiById: builder.query<any, string>({
      query: (apiId) => ({
        url: `/api/v1/apis/${apiId}`,
        method: 'GET',
        credentials: 'include',
      }),
      providesTags: (result, error, apiId) => [{ type: 'Api', id: apiId }],
    }),
  }),
});

// Export hooks for components
export const {
  useGetPublicApisQuery,
  useGetMyApisQuery,
  useGetSubscribedApisQuery,
  useGetBookmarkedApisQuery,
  useGetApiByIdQuery,
} = apisApi;
