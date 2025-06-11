import useSWR from 'swr';

import { getHoroscope } from '@/actions';
import { useAppStore } from '@/store';

export function useHoroscrope(language: string) {
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
  const fetcher = (keys: string[]) => getHoroscope(language);
  const { data, error, isLoading } = useSWR([`/horoscope`], fetcher);

  return {
    data: data?.data,
    isLoading,
    isError: error,
  };
}
