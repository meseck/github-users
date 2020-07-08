import { SearchUsersResponseData } from '@octokit/types';

interface Props {
  searchData: SearchUsersResponseData;
}

const SearchInformation = ({ searchData }: Props): JSX.Element => {
  return (
    <p>
      {searchData.total_count > 1000 ? '1000' : searchData.total_count}{' '}
      {searchData.total_count > 1 ? 'users' : 'user'} was found. Click on{' '}
      {searchData.total_count > 1 ? 'a' : 'the'} user to get more information.
    </p>
  );
};

export default SearchInformation;
