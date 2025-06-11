import { ApiClient } from '@/utils';

export const sendOtp = (phoneNumber: string) => {
  const apiClient = ApiClient();
  return apiClient.post(`/otp/phone-otp`, {
    phoneNumber,
  });
};

export const sendEamilOtp = async (email: string) => {
  const apiClient = ApiClient();
  return await apiClient.post(`/otp/email-otp`, {
    email,
  });
};

export const verifyPhoneOtp = async (phoneNumber: string, code: string) => {
  const apiClient = ApiClient();
  return await apiClient.post(`/otp/verify-phone-otp`, { phoneNumber, code });
};

export const verifyEmailOtp = async (email: string, code: string) => {
  const apiClient = ApiClient();
  return await apiClient.post(`/otp/verify-email-otp`, { email, code });
};
