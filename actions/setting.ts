import { ApiClient } from '@/utils';

export const setBaseSettings = async (settingId: number, enable: boolean) => {
  const apiClient = ApiClient();
  return await apiClient.post(`/setting`, { settingId, enable });
};
