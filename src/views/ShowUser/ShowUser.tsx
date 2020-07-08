import { UsersGetByUsernameResponseData } from '@octokit/types';
import Link from 'next/link';
import styled from 'styled-components';

import UserInfo from './components/UserInfo';
import Username from './components/Username';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
`;

const ProfilePicture = styled.img`
  width: 250px;
  height: 250px;
  border: 1px solid lightgrey;
  border-radius: 4px;
`;

const Info = styled.div`
  margin-left: 2.5rem;
`;

type Props = {
  userData: UsersGetByUsernameResponseData;
};

const ShowUser = ({ userData }: Props): JSX.Element => {
  return (
    <Container>
      <ProfilePicture src={userData.avatar_url} alt="Profile picture" />
      <Info>
        <Username userData={userData} />
        <UserInfo userData={userData} />
        <Link href="/">Go back</Link>
      </Info>
    </Container>
  );
};

export default ShowUser;
