import { ApiClient } from '@/utils';

export const getNotifications = async () => {
  const apiClient = ApiClient();
  return await apiClient.get(`/notification`);
};
