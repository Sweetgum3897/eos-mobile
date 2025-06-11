import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

// import { useAppStore } from '@/store';

export const SERVER_BASE_URL = 'https://api.aeonai.ai';
// export const SERVER_BASE_URL = 'http://192.168.133.169:2002';
export const API_SERVER_URL = SERVER_BASE_URL + '';

// ----------------------------------------------------------------------
export function ApiClient() {
  // const logout = useAppStore((state) => state.logout);
  const axiosInstance = axios.create({ baseURL: SERVER_BASE_URL });

  axiosInstance.interceptors.request.use(
    async (request: InternalAxiosRequestConfig) => {
      const accessToken = await AsyncStorage.getItem('accessToken');
      if (accessToken) {
        request.headers.set('Authorization', `Bearer ${accessToken}`);
      }
      return request;
    },
    (error) => Promise.reject(error),
  );

  axiosInstance.interceptors.response.use(
    async (response: AxiosResponse) => response,
    async (error: AxiosError) => {
      const originalRequest: (InternalAxiosRequestConfig & { _retry?: boolean }) | undefined =
        error.config;
      if (error.response?.status === 401 && originalRequest && !originalRequest?._retry) {
        originalRequest._retry = true;

        try {
          const refreshToken = await AsyncStorage.getItem('refreshToken');
          if (!refreshToken) {
            return Promise.reject(error);
          }
          const newToken = await axios
            .post(`${API_SERVER_URL}/auth/refresh-token`, {
              refreshToken,
            })
            .then((response) => response.data);

          if (newToken) {
            await AsyncStorage.setItem('accessToken', newToken);
            const newInstance = axios.create({ baseURL: SERVER_BASE_URL });

            originalRequest.headers.set('Authorization', `Bearer ${newToken}`);
            return await newInstance(originalRequest);
          }

          // logout();
          return Promise.reject(error);
        } catch (refreshError) {
          // logout();
          return Promise.reject(refreshError);
        }
      }
      // logout();
      return Promise.reject(error);
    },
  );

  return axiosInstance;
}

// ----------------------------------------------------------------------

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const axiosInstance = ApiClient();
  const res = await axiosInstance.get(url, { ...config });

  return res.data;
};

// ----------------------------------------------------------------------
