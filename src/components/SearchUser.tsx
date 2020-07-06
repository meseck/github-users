import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import { useDebounceInput, useFetchUser } from '../global/hooks';

const InputField = styled.input`
  padding: 0.31rem 0.44rem;
  font-size: 1rem;
  border: 1px solid lightgrey;
  border-radius: 4px;
`;

const SearchUser: React.FC = () => {
  const [searchInput, setSearchInput] = useState('');
  // On all input changes the debounce hook is called this prevents API calls at every keypress
  const debouncedSearchInput = useDebounceInput(searchInput, 1000);
  // After debouncing, the search query is updated and the request is sent to the GitHub API
  const { userData, isError, isLoading } = useFetchUser(
    debouncedSearchInput ? debouncedSearchInput : null
  );

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  return (
    <div>
      <InputField
        onChange={handleInputChange}
        placeholder={!searchInput && 'Please enter a username'}
      />
      {searchInput && isLoading && <p>Searching..</p>}
      {isError && (
        <>
          <p>No one with this username was found.</p>
          <p>Do you want to register this username? </p>
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
