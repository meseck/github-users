import { SearchUsersResponseData } from '@octokit/types';

type Props = {
  searchData: SearchUsersResponseData;
  isValidInput: boolean;
  isLoading: boolean;
  validationErrorMsg: string;
};

const SearchInformation = ({
  searchData,
  isValidInput,
  isLoading,
  validationErrorMsg,
}: Props): JSX.Element => {
  return (
    <div>
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
    </div>
  );
};

export default SearchInformation;
