import { SearchUsersResponseData } from '@octokit/types';
import useSWR, { ConfigInterface } from 'swr';
import { useEffect, useState } from 'react';
import { searchUser } from '../api';
import { usernameValidation } from '../utils';

type Return = {
  searchData: SearchUsersResponseData;
  isLoading: boolean;
  isError: Error;
  isValidInput: boolean;
  validationErrorMsg: string;
};

export const useSearchUser = (
  username: string,
  options?: ConfigInterface
): Return => {
  const [validInput, setValidInput] = useState('');
  const [validationErrorMsg, setValidationErrorMsg] = useState('');
  // Use useSWR Hook for fetching data (client-side)
  const { data, error } = useSWR(
    validInput ? validInput : null,
    searchUser,
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
    searchData: data,
    isLoading: !error && !data,
    isError: error,
    isValidInput: !!validInput,
    validationErrorMsg: validationErrorMsg,
  };
};
