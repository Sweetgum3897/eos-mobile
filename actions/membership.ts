import { ApiClient } from '@/utils';

export const storeMembership = async (id: number) => {
  const apiClient = ApiClient();
  return await apiClient.put(`/membership/${id}`);
};

export const cancelMembership = async () => {
  const apiClient = ApiClient();
  return await apiClient.put(`/membership/cancel`);
};

export const getMemberships = async () => {
  const apiClient = ApiClient();
  return await apiClient.get(`/membership`);
};
