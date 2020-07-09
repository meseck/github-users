import { useEffect, useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { IoIosArrowBack } from 'react-icons/io';

import { useFetchUser } from '../../global/hooks/useFetchUser';
import { usernameValidation } from '../../global/utils';
import UserInfo from './components/UserInfo';
import Username from './components/Username';
import InfoMsg from './components/InfoMsg';

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
  username: string | string[];
};

const ShowUser = ({ username }: Props): JSX.Element => {
  const [validInput, setValidInput] = useState('');
  const { userData, isLoading, isError } = useFetchUser(validInput);

  useEffect(() => {
    // This fixes a type problem that a query can be string | string[].
    // It can be string[], because with something like [...path].ts you can pass directories
    // like /foo/bar/page and then you get ['foo', 'bar', 'page'] back.
    // In this page(route) it can only be a string!
    if (username && typeof username === 'string') {
      if (usernameValidation(username) === 'valid') {
        setValidInput(username);
      }
    }
  }, [username]);

  return (
    <Container>
      {!isLoading && !isError && userData && (
        <>
          <ProfilePicture src={userData.avatar_url} alt="Profile picture" />
          <Info>
            <Username userData={userData} />
            <UserInfo userData={userData} />
            <IoIosArrowBack />
            <Link href="/">
              <a>Go back</a>
            </Link>
          </Info>
        </>
      )}
      <InfoMsg
        validInput={validInput}
        isLoading={isLoading}
        isError={isError}
      />
    </Container>
  );
};

export default ShowUser;
