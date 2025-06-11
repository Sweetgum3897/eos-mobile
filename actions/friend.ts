import { ApiClient } from '@/utils';

export const getFriendsByBirthday = async () => {
  const apiClient = ApiClient();
  return await apiClient.get(`/friend/birth`);
};

export const sendBirthdayCelebrationMessage = async (friendId: string) => {
  const apiClient = ApiClient();
  return await apiClient.post(`/friend/send-birthday-celebration-message`, { friendId });
};

export const getFriends = async () => {
  const apiClient = ApiClient();
  return await apiClient.get(`/friend`);
};

export const sendFriendRequest = async (friendId: number) => {
  const apiClient = ApiClient();
  return await apiClient.post(`/friend/send-friend-request`, {
    friendId,
  });
};

export const acceptResponse = async (requesterId: number, notifyId: number) => {
  const apiClient = ApiClient();
  return await apiClient.post(`/friend/accept`, {
    requesterId,
    notifyId,
  });
};

export const rejectResponse = async (requesterId: number, notifyId: number) => {
  const apiClient = ApiClient();
  return await apiClient.post(`/friend/reject`, {
    requesterId,
    notifyId,
  });
};
