import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import { useDebounceInput, useSearchUser } from '../global/hooks';

const InputField = styled.input`
  padding: 0.31rem 0.44rem;
  font-size: 1rem;
  border: 1px solid lightgrey;
  border-radius: 4px;
`;

const ProfilePicture = styled.img`
  width: 100px;
  height: auto;
  border-radius: 100%;
`;

const SearchUser: React.FC = () => {
  const [searchInput, setSearchInput] = useState('');
  // On all input changes the debounce hook is called this prevents API calls at every keypress
  const debouncedSearchInput = useDebounceInput(searchInput, 1000);
  // After debouncing, the search query is updated and the request is sent to the GitHub API
  const {
    searchData,
    isError,
    isLoading,
    isValidInput,
    validationErrorMsg,
  } = useSearchUser(debouncedSearchInput ? debouncedSearchInput : null, {
    // Prevents call to API after page is focused or user is reconnected and also retries on errors
    // This settings are good practice for development
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    shouldRetryOnError: false,
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  return (
    <div>
      <InputField
        onChange={handleInputChange}
        placeholder={!searchInput ? 'Please enter a username' : undefined}
      />
      {searchInput && isLoading && isValidInput && <p>Searching..</p>}
      {isError && isValidInput && (
        <>
          <p>No one was found.</p>
        </>
      )}
      {!isValidInput && <p>{validationErrorMsg}</p>}
      {!isLoading && !isError && (
        <>
          {searchData.items.map((user) => {
            return (
              <div key={user.id}>
                <p>
                  <ProfilePicture src={user.avatar_url} alt="Profile picture" />
                  <a href={`/users/${user.login}`}>{user.login}</a>
                </p>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default SearchUser;
