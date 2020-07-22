import { ChangeEvent, MutableRefObject } from 'react';
import styled from 'styled-components';
import { IoMdSearch } from 'react-icons/io';

import InputField from '../../../components/InputField';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  svg {
    margin-right: 0.28rem;
  }

  label {
    display: block;
    margin-right: 1rem;
    font-size: 1.22rem;
    font-weight: 400;
  }

  @media (max-width: 390px) {
    flex-wrap: wrap;
    justify-content: flex-start;

    label,
    svg {
      margin-bottom: 1rem;
    }
  }
`;

interface Props {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  searchInput: string;
  searchInputRef: MutableRefObject<HTMLInputElement>;
}

const SearchBar = ({
  onChange,
  searchInput,
  searchInputRef,
}: Props): JSX.Element => {
  return (
    <Container>
      <IoMdSearch />
      <label htmlFor="search-field">Search:</label>
      <InputField
        id="search-field"
        name="Search"
        ref={searchInputRef}
        onChange={onChange}
        placeholder={!searchInput ? 'Please enter a username' : undefined}
        autoFocus
      />
    </Container>
  );
};

export default SearchBar;
