import { UsersGetByUsernameResponseData } from '@octokit/types';
import styled from 'styled-components';

type Props = {
  userData: UsersGetByUsernameResponseData;
};

const Container = styled.div`
  margin-bottom: 1rem;
`;

const Bio = styled.p`
  font-size: 1.25rem;
  line-height: 1.75rem;
`;

const UserInfo = ({ userData }: Props): JSX.Element => {
  return (
    <Container>
      {userData.bio && <Bio>{userData.bio.trim()}</Bio>}
      <div>
        {userData.location && <p>Location: {userData.location}</p>}
        {userData.company && <p>Company: {userData.company}</p>}
        {userData.email && <p>Email: {userData.email}</p>}
        {userData.twitter_username && (
          <p>Twitter {userData.twitter_username}</p>
        )}
        <p>Joined GitHub: {new Date(userData.created_at).getFullYear()}</p>
        <p>
          <span>{userData.followers} followers | </span>
          <span>{userData.following} following </span>
        </p>
      </div>
    </Container>
  );
};

export default UserInfo;
