import useSWR from 'swr';

import { getAllUsers } from '@/actions';
import { useAppStore } from '@/store';

export function useAllUsers() {
  const userInfo = useAppStore((state) => state.userInfo);
  if (!userInfo.id) {
    return {
      data: [],
      isLoading: false,
      isError: true,
      refresh: () => {},
    };
  }
  const fetcher = (keys: string[]) => getAllUsers();
  const { data, error, isLoading, mutate } = useSWR([`/user/list`], fetcher);

  return {
    data: data?.data || [],
    isLoading,
    isError: error,
    refresh: mutate,
  };
}
