import { ApiClient } from '@/utils';

export const createStripeCustomer = async () => {
  const apiClient = ApiClient();
  return await apiClient.post(`/stripe/create-customer`);
};

export const createStripeSubscription = async (priceId: string) => {
  const apiClient = ApiClient();
  return await apiClient.post(`/stripe/create-subscription`, {
    priceId,
  });
};

export const cancelStripeSubscription = async () => {
  const apiClient = ApiClient();
  return await apiClient.post(`/stripe/cancel-subscription`);
};

export const fetchGooglePaymentIntent = async (currency: string, amount: string, days: string) => {
  const apiClient = ApiClient();
  return await apiClient.post(`/stripe/create-google-payment-intent`, {
    currency,
    amount,
    days,
  });
};
