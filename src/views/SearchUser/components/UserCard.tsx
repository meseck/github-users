import styled from 'styled-components';
import Link from 'next/link';
import { SearchUsersResponseData } from '@octokit/types';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
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
  width: 100px;
  height: 100px;
  border-radius: 100%;
`;
const Username = styled.span`
  margin-top: 1rem;
  font-size: 1rem;
`;

type Props = {
  // Get only the type of on element of items
  user: SearchUsersResponseData['items'][0];
};

const UserCard = ({ user }: Props): JSX.Element => {
  return (
    <Link href={`/users/${user.login}`}>
      <Container>
        <ProfilePicture src={user.avatar_url} alt="Profile picture" />
        <Username>{user.login}</Username>
      </Container>
    </Link>
  );
};

export default UserCard;
