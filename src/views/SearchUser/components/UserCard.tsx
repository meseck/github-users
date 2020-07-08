import styled from 'styled-components';
import Link from 'next/link';
import { SearchUsersResponseData } from '@octokit/types';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  cursor: pointer;
  border: 1px solid lightgrey;
  border-radius: 4px;
  transition: all 200ms ease-in-out;

  :hover {
    border: 1px solid lightblue;
    box-shadow: 0 1px 1px lightgrey;
    transform: scale(1.025);
  }
`;

const ProfilePicture = styled.img`
  width: 100%;
  height: auto;
`;

const Username = styled.span`
  margin: 1rem 0;
  font-size: 1rem;
`;

type Props = {
  // Get only the type of on element of items
  user: SearchUsersResponseData['items'][0];
};

const UserCard = ({ user }: Props): JSX.Element => {
  return (
    <Link
      prefetch={true}
      href={'/users/[username]'}
      as={`/users/${user.login}`}
    >
      <Container>
        <ProfilePicture src={user.avatar_url} alt="Profile picture" />
        <Username>{user.login}</Username>
      </Container>
    </Link>
  );
};

export default UserCard;
