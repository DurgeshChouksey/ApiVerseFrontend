// src/features/user/userApi.ts
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '@/lib/baseQueryWithReauth';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    // ✅ Use a query instead of mutation
    getUserProfile: builder.query({
      query: () => ({
        url: '/api/v1/auth/check-auth',
        method: 'POST', // still POST, that's fine
        credentials: 'include',
      }),
    }),

    loginUser: builder.mutation<any, { identifier: string; password: string }>({
      query: (credentials) => ({
        url: '/api/v1/auth/login',
        method: 'POST',
        credentials: 'include',
        body: {
          identifier: credentials.identifier,
          password: credentials.password,
        },
      }),
    }),

    logoutUser: builder.mutation({
      query: () => ({
        url: '/api/v1/auth/logout',
        method: 'POST',
        credentials: 'include',
      }),
    }),
  }),
});

export const { useGetUserProfileQuery, useLogoutUserMutation, useLoginUserMutation } = userApi;
