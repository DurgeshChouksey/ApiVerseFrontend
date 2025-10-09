import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;


export const fetchWithAuth = async (
  url: string,
  options: { method?: string; data?: any; headers?: Record<string, string> } = {}
) => {
  const makeRequest = async () => {
    const response = await axios({
      url: `${BASE_URL}${url}`,
      method: options.method || 'GET',
      data: options.data || {},
      headers: options.headers || {},
      withCredentials: true,
    });
    return response.data; // directly return data
  };

  try {
    return await makeRequest();
  } catch (error: any) {
    if (error.response?.status === 401) {
      try {
        // try refreshing token
        const refreshResponse = await axios.post(
          `${BASE_URL}/api/v1/auth/refresh-token`,
          {},
          { withCredentials: true }
        );

        if (refreshResponse.status === 200) {
          // retry original request
          return await makeRequest();
        }
      } catch (refreshError) {
        // redirect to login if refresh fails
        window.location.href = '/signin';
        return null;
      }
    } else {
      throw error;
    }

  }
};
