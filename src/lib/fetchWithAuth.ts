// src/lib/fetchWithAuth.ts
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Utility to get tokens from localStorage (or cookies)
const getAccessToken = () => localStorage.getItem('accessToken');
const getRefreshToken = () => localStorage.getItem('refreshToken');
const setTokens = (accessToken: string, refreshToken?: string) => {
  localStorage.setItem('accessToken', accessToken);
  if (refreshToken) localStorage.setItem('refreshToken', refreshToken);
};

export const fetchWithAuth = async (
  url: string,
  options: { method?: string; data?: any } = {}
) => {
  try {
    const token = getAccessToken();

    const response = await axios({
      url: `${BASE_URL}${url}`,
      method: options.method || 'GET',
      data: options.data || {},
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      withCredentials: true, // if using cookies
    });

    return response ;
  } catch (error: any) {
    // If unauthorized, try to refresh token
    if (error.response?.status === 401) {
      try {
        const refreshToken = getRefreshToken();
        if (!refreshToken) throw new Error('No refresh token available');

        const refreshResponse = await axios.post(
          `${BASE_URL}/api/v1/auth/refresh-token`,
          { refreshToken },
          { withCredentials: true }
        );

        // Save new tokens
        setTokens(refreshResponse.data.accessToken, refreshResponse.data.refreshToken);

        // Retry original request
        const retryResponse = await axios({
          url: `${BASE_URL}${url}`,
          method: options.method || 'GET',
          data: options.data || {},
          headers: {
            Authorization: `Bearer ${refreshResponse.data.accessToken}`,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });

        return retryResponse.data;
      } catch (refreshError) {
        // If refresh fails, clear tokens and redirect to login
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/signin';
        throw refreshError;
      }
    }

    throw error;
  }
};
