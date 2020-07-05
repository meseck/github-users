import React, { ChangeEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDebounceInput, useFetchUser } from '../global/hooks';

const InputField = styled.input`
  padding: 0.31rem 0.44rem;
  font-size: 1rem;
  border: 1px solid lightgrey;
  border-radius: 4px;
`;

const SearchUser: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  // On all input changes the debounce hook is called this prevents API calls at every keypress
  const debouncedSearchQuery = useDebounceInput(searchQuery, 1000);
  // After debouncing, the search query is updated and the request is sent to the GitHub API
  const { userData, isError, isLoading } = useFetchUser(
    debouncedSearchQuery ? debouncedSearchQuery : null
  );

  useEffect(() => {
    if (debouncedSearchQuery) {
    }
  }, [debouncedSearchQuery]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div>
      <InputField onChange={handleChange} />
      {!searchQuery && <p>Please enter a username.</p>}
      {searchQuery && isLoading && <p>Searching..</p>}
      {searchQuery && !userData && (
        <>
          <p>No one with this username was found.</p>
          <p>Do you want to register this name? </p>
          <a href="https://github.com/join" rel="noreferrer" target="_blank">
            Join GitHub
          </a>
        </>
      )}
      {!isLoading && !isError && (
        <>
          <h1>{userData.name}</h1>
          <p>{userData.login}</p>
          <p>{userData.bio}</p>
        </>
      )}
    </div>
  );
};

export default SearchUser;
