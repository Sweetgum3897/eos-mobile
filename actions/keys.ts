import { ApiClient } from '@/utils';

export const fetchKeys = async () => {
  const apiClient = ApiClient();
  const response = await apiClient.get(`/config`).catch((e) => {
    return e.response;
  });
  return response;
};
