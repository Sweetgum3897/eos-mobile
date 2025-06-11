import { ApiClient } from '@/utils';

export const getHoroscope = async (language: string) => {
  const apiClient = ApiClient();
  return await apiClient.get(`/horoscope?lang=${language}`);
};

export const getDiveDeeperHoroscope = async (language: string) => {
  const apiClient = ApiClient();
  return await apiClient.get(`/horoscope/dive-deeper?lang=${language}`);
};

export const getChartData = async (chartName: string, language: string) => {
  const apiClient = ApiClient();
  return await apiClient.get(`/horoscope/chart/${chartName}?lang=${language}`);
};
