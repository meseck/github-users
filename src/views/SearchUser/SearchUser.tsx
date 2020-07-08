import React, { ChangeEvent, useEffect, useRef, useState } from 'react';

import { useSearchUser } from '../../global/hooks/useSearchUser';
import { useDebounceInput } from '../../global/hooks/useDebounceInput';
import { calculateNumberOfPages } from '../../global/utils';

import UserCard from './components/UserCard';
import PageNavigation from './components/PageNavigation';
import Title from '../../components/Title';
import SearchBar from './components/SearchBar';
import SearchInfoMsg from './components/SearchInfoMsg';
import UserCardContainer from './components/UserCardsContainer';

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
  } = useSearchUser(debouncedSearchInput, currentPage, entriesPerPage);

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
    <>
      <Title>GitHub Users</Title>
      <SearchBar
        onChange={handleChange}
        searchInput={searchInput}
        searchInputRef={searchInputRef}
      />
      <div>
        <SearchInfoMsg
          searchData={searchData}
          isValidInput={isValidInput}
          isLoading={isLoading}
          validationErrorMsg={validationErrorMsg}
        />
      </div>
      {!isLoading && searchData.total_count !== 0 && (
        <section>
          <UserCardContainer>
            {searchData.items.map((user) => {
              return <UserCard key={user.id} user={user} />;
            })}
          </UserCardContainer>
          <PageNavigation
            onPageNavigation={handlePageNavigation}
            currentPage={currentPage}
            numberOfPages={numberOfPages}
          />
        </section>
      )}
      {!isLoading && isValidInput && searchData.total_count === 0 && (
        <p>
          No one with this username was found on GitHub.{' '}
          <a href="/" onClick={handleClick}>
            Try again
          </a>
        </p>
      )}
    </>
  );
};

export default SearchUser;
