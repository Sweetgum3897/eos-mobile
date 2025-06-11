import { ApiClient } from '@/utils';

export const verifyExistsUser = async (data: any) => {
  const apiClient = ApiClient();
  return await apiClient.post(`/auth/verify-exists`, data);
};

export const sign = (data: any) => {
  const apiClient = ApiClient();
  return apiClient.post(`/auth/sign-in`, data);
};

export const googleSign = async (data: any) => {
  const apiClient = ApiClient();
  return await apiClient.post(`/auth/google`, data);
};

export const signUp = async (data: any) => {
  const apiClient = ApiClient();
  if (data.phonenumber === '') {
    delete data.phonenumber;
  }
  if (data.email === '') {
    delete data.email;
  }
  return await apiClient.post(`/auth/sign-up`, data);
};

export const getNewToken = async (refreshToken: string) => {
  const apiClient = ApiClient();
  return apiClient
    .post(`/auth/refresh-token`, {
      refreshToken,
    })
    .then((response) => response.data);
};
