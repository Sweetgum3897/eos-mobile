import useSWR from 'swr';

import { getChartData } from '@/actions';
import { useAppStore } from '@/store';

export function useChartData(chartName: string, language: string) {
  const userInfo = useAppStore((state) => state.userInfo);
  if (!userInfo.id) {
    return {
      data: null,
      isLoading: false,
      isError: {
        message: 'Authenticate required',
      },
    };
  }
  const fetcher = (keys: string[]) => getChartData(chartName, language);
  const { data, error, isLoading } = useSWR([`/horoscope/chart-data`], fetcher);

  return {
    data: data?.data,
    isLoading,
    isError: error,
  };
}
