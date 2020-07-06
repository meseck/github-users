import { useState, useEffect } from 'react';
import useSWR, { ConfigInterface } from 'swr';
import { UsersGetByUsernameResponseData } from '@octokit/types';

import { fetchUser } from './api';
import { usernameValidation } from './utils';

type FetchUserReturn = {
  userData: UsersGetByUsernameResponseData;
  isLoading: boolean;
  isError: Error;
  isValidInput: boolean;
  validationErrorMsg: string;
};

export const useFetchUser = (
  username: string,
  options?: ConfigInterface
): FetchUserReturn => {
  const [validInput, setValidInput] = useState('');
  const [validationErrorMsg, setValidationErrorMsg] = useState('');
  // Use useSWR Hook for fetching data (client-side)
  const { data, error } = useSWR(
    validInput ? validInput : null,
    fetchUser,
    options
  );

  // Input validation
  useEffect(() => {
    if (username) {
      if (usernameValidation(username) !== 'valid') {
        setValidationErrorMsg(usernameValidation(username));
        setValidInput('');
      } else {
        setValidationErrorMsg('');
        setValidInput(username);
      }
    }
  }, [username]);

  return {
    userData: data,
    isLoading: !error && !data,
    isError: error,
    isValidInput: !!validInput,
    validationErrorMsg: validationErrorMsg,
  };
};

export const useDebounceInput = (value: string, delay: number): string => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      const debounce = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      return () => {
        clearTimeout(debounce);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );

  return debouncedValue;
};
