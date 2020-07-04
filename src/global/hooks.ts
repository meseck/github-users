import useSWR from 'swr';
import { fetchUser } from './api';
import { UserData } from './types';

type FetchUserReturn = {
  userData: UserData;
  isLoading: boolean;
  isError: boolean;
};

export const useFetchUser = (username: string | string[]): FetchUserReturn => {
  // Use useSWR Hook for fetching data (client-side)
  const { data, error } = useSWR(username, fetchUser);

  return {
    userData: data,
    isLoading: !error && !data,
    isError: error,
  };
};
