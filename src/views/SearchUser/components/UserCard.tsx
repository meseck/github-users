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
    border: 1px solid silver;
    box-shadow: 0 1px 1px lightgrey;
    transform: scale(1.025);
  }
`;

const ProfilePictureWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%;
  overflow: hidden;
  background-color: lightgrey;
`;

const ProfilePicture = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  border-radius: 4px 4px 0 0;
`;

const Username = styled.div`
  width: 100%;
  padding: 0 1rem;
  margin: 1rem 0;
  overflow: hidden;
  font-size: 1.11rem;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
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
        <ProfilePictureWrapper>
          <ProfilePicture src={user.avatar_url} alt="Profile picture" />
        </ProfilePictureWrapper>
        <Username>{user.login}</Username>
      </Container>
    </Link>
  );
};

export default UserCard;
