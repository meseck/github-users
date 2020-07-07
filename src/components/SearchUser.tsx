import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { useSearchUser } from '../global/hooks/useSearchUser';
import { useDebounceInput } from '../global/hooks/useDebounceInput';
import { calculateNumberOfPages } from '../global/utils';

const InputField = styled.input`
  padding: 0.31rem 0.44rem;
  margin: 1rem;
  font-size: 1rem;
  border: 1px solid lightgrey;
  border-radius: 4px;
`;

const ProfilePicture = styled.img`
  width: 100px;
  height: auto;
  border-radius: 100%;
`;

const PageNavigationButtons = styled.button`
  padding: 0.31rem 0.44rem;
  border: none;
  border-radius: 4px;

  &.disabled {
    color: grey;
    pointer-events: none;
    background-color: lightgrey;
  }
`;

const SearchUser: React.FC = () => {
  // GitHub API has a maximum of 100 on the /search/users endpoint
  const entriesPerPage = 10;

  const searchInputRef = useRef<HTMLInputElement>(null);

  const [searchInput, setSearchInput] = useState('');
  const [numberOfPages, setNumberOfPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // On all input changes the debounce hook is called this prevents API calls at every keypress
  const debouncedSearchInput = useDebounceInput(searchInput, 500);

  // After debouncing, the search query is updated and the request is sent to the GitHub API
  const {
    searchData,
    isError,
    isLoading,
    isValidInput,
    validationErrorMsg,
  } = useSearchUser(debouncedSearchInput, currentPage, entriesPerPage, {
    // Prevents call to API after page is focused or user is reconnected and also retries on errors (good for development)
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    shouldRetryOnError: false,
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    searchInputRef.current.value = '';
    searchInputRef.current.focus();
  };

  const handlePageNavigation = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (event.currentTarget.id === 'next-page') {
      setCurrentPage((prevState) => prevState + 1);
    } else {
      setCurrentPage((prevState) => prevState - 1);
    }
  };

  // Reset current page every time a new search was started
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchInput]);

  // Set new page numbers when there is new data from the API
  useEffect(() => {
    if (searchData) {
      // Github API only shows the first 1000 results
      if (searchData.total_count < 1000) {
        setNumberOfPages(
          calculateNumberOfPages(searchData.total_count, entriesPerPage)
        );
      } else {
        setNumberOfPages(1000 / entriesPerPage);
      }
    }
  }, [searchData]);

  return (
    <div>
      <label htmlFor="search-field">Search: </label>
      <InputField
        id="search-field"
        name="Search"
        ref={searchInputRef}
        onChange={handleChange}
        placeholder={!searchInput ? 'Please enter a username' : undefined}
      />
      {searchInput && isLoading && isValidInput && <p>Searching..</p>}
      {!isValidInput && <p>{validationErrorMsg}</p>}
      {searchData && searchData.total_count === 0 && isValidInput && (
        <>
          <p>
            No one was found.{' '}
            <a href="/" onClick={handleClick}>
              Try again
            </a>
          </p>
        </>
      )}
      {!isLoading && !isError && searchData.total_count !== 0 && (
        <>
          <p>
            {searchData.total_count > 1000 ? '1000' : searchData.total_count}{' '}
            {searchData.total_count > 1 ? 'users' : 'user'} was found. Click on{' '}
            {searchData.total_count > 1 ? 'a' : 'the'} user to get more
            information.
          </p>
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
          <PageNavigationButtons
            id="previous-page"
            onClick={handlePageNavigation}
            className={currentPage === 1 ? 'disabled' : null}
          >
            Previous
          </PageNavigationButtons>{' '}
          {currentPage} / {numberOfPages}{' '}
          <PageNavigationButtons
            id="next-page"
            onClick={handlePageNavigation}
            className={currentPage === numberOfPages ? 'disabled' : null}
          >
            Next
          </PageNavigationButtons>
        </>
      )}
    </div>
  );
};

export default SearchUser;
