import useSWR from 'swr';

import { getFriends } from '@/actions';
import { useAppStore } from '@/store';

export function useAllFriends() {
  const userInfo = useAppStore((state) => state.userInfo);
  if (!userInfo.id) {
    return {
      data: [],
      isLoading: false,
      isError: true,
      refresh: () => {},
    };
  }
  const fetcher = (keys: string[]) => getFriends();
  const { data, error, isLoading, mutate } = useSWR([`/friend`], fetcher);

  return {
    data: data?.data || [],
    isLoading,
    isError: error,
    refresh: mutate,
  };
}
