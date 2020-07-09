import { UsersGetByUsernameResponseData } from '@octokit/types';
import Link from 'next/link';
import styled from 'styled-components';
import { IoIosArrowBack } from 'react-icons/io';

import UserInfo from './components/UserInfo';
import Username from './components/Username';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;

  svg {
    margin-bottom: -3px;
  }

  a {
    font-weight: 400;
    color: black;
    text-decoration: none;
  }

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const ProfilePicture = styled.img`
  width: 250px;
  height: 250px;
  border: 1px solid lightgrey;
  border-radius: 4px;

  @media (max-width: 450px) {
    margin-top: -1.5rem;
  }
`;

const Info = styled.div`
  margin-left: 2.5rem;

  @media (max-width: 900px) {
    margin: 2.5rem 0 0 0;
  }
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
        <IoIosArrowBack />
        <Link href="/">
          <a>Go back</a>
        </Link>
      </Info>
    </Container>
  );
};

export default ShowUser;
