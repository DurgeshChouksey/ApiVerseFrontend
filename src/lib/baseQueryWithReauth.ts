import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';

// const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const BASE_URL = "http://localhost:8787";

// Normal base query — attaches credentials (cookies)
const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: 'include', // ✅ allow cookies to be sent automatically
});

// Enhanced base query that retries after token refresh
export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // 1️⃣ Perform the request
  let result = await baseQuery(args, api, extraOptions);

  // 2️⃣ If unauthorized → try refresh
  if (result.error && result.error.status === 401) {
    console.warn('Access token expired, trying refresh...');

    // Try to refresh access token
    const refreshResult = await baseQuery(
      { url: '/api/v1/auth/refresh-token', method: 'POST' },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      console.log('Refresh token successful, retrying original request...');
      // 3️⃣ Retry original request (cookies now updated with new access token)
      result = await baseQuery(args, api, extraOptions);
    } else {
      console.warn('Refresh token failed. Logging out...');
      // 4️⃣ Optionally clear user session in Redux
      api.dispatch({ type: 'user/logoutUser' });
    }
  }

  // 5️⃣ Return final result
  return result;
};
