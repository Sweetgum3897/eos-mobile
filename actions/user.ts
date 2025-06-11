import { ApiClient } from '@/utils';

export const update = async (data: any) => {
  const apiClient = ApiClient();
  return await apiClient.put(`/user`, data);
};

export const uploadAvatar = async (uri: string, extension: string, userId: number) => {
  const apiClient = ApiClient();
  const formData = new FormData();
  formData.append('image', {
    uri: uri,
    type: 'image/jpeg',
    name: userId + extension,
  } as any);
  return await apiClient.post('/user/upload-avatar', formData, {
    headers: {
      'Content-Type': 'multipart/form-data', // Set the content type header for the request
    },
  });
};

export const changePassword = async (data: any) => {
  const apiClient = ApiClient();
  return await apiClient.post(`/user/change-password`, data);
};

export const setActivityFeed = async (data: { activityType: number; enabled: boolean }) => {
  const apiClient = ApiClient();
  return await apiClient.post(`/user/set-activity-feed`, data);
};

export const getAllUsers = async () => {
  const apiClient = ApiClient();
  return await apiClient.get('/user/list');
};

export const submitContact = async (content: string) => {
  const apiClient = ApiClient();

  return await apiClient.post(`/user/contact`, { content });
};
