import { UsersGetByUsernameResponseData } from '@octokit/types';
import useSWR, { ConfigInterface } from 'swr';

import { fetchUser } from '../api';

type Return = {
  userData: UsersGetByUsernameResponseData;
  isLoading: boolean;
  isError: Error;
};

export const useFetchUser = (
  username: string,
  options?: ConfigInterface
): Return => {
  // Use useSWR Hook for fetching data (client-side)
  const { data, error } = useSWR(username, fetchUser, options);

  return {
    userData: data,
    isLoading: !error && !data,
    isError: error,
  };
};
