import { SearchUsersResponseData } from '@octokit/types';
import styled from 'styled-components';

const Container = styled.div`
  margin: 2rem 0;
`;

type Props = {
  searchData: SearchUsersResponseData;
  isValidInput: boolean;
  isLoading: boolean;
  validationErrorMsg: string;
};

const SearchInfoMsg = ({
  searchData,
  isValidInput,
  isLoading,
  validationErrorMsg,
}: Props): JSX.Element => {
  return (
    <Container>
      {isValidInput && isLoading && <p>Searching..</p>}
      {!isValidInput && <p>{validationErrorMsg}</p>}
      {!isLoading && searchData.total_count !== 0 && (
        <p>
          {searchData.total_count > 1000 ? '1000' : searchData.total_count}{' '}
          {searchData.total_count > 1 ? 'users' : 'user'} was found. Click on{' '}
          {searchData.total_count > 1 ? 'a' : 'the'} user to get more
          information.
        </p>
      )}
    </Container>
  );
};

export default SearchInfoMsg;
