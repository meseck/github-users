import useSWR, { ConfigInterface } from 'swr';
import { fetchUser } from './api';
import { UserData } from './types';

type FetchUserReturn = {
  userData: UserData;
  isLoading: boolean;
  isError: boolean;
};

export const useFetchUser = (
  username: string | string[],
  options?: ConfigInterface
): FetchUserReturn => {
  // Use useSWR Hook for fetching data (client-side)
  const { data, error } = useSWR(username, fetchUser, options);

  return {
    userData: data,
    isLoading: !error && !data,
    isError: error,
  };
};
