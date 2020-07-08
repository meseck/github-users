import { ChangeEvent, MutableRefObject } from 'react';
import styled from 'styled-components';

import InputField from '../../../components/InputField';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  & label {
    margin-right: 1rem;
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
      <label htmlFor="search-field">Search:</label>
      <InputField
        id="search-field"
        name="Search"
        ref={searchInputRef}
        onChange={onChange}
        placeholder={!searchInput ? 'Please enter a username' : undefined}
      />
    </Container>
  );
};

export default SearchBar;
