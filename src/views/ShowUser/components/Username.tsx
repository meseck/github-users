import React from 'react';
import { UsersGetByUsernameResponseData } from '@octokit/types';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const FullName = styled.h1`
  margin: 0;
`;

const LoginName = styled.h2`
  margin: 0;
`;

type Props = {
  userData: UsersGetByUsernameResponseData;
};

const Username: React.FC<Props> = ({ userData }) => {
  return (
    <Container>
      {userData.name ? (
        <>
          <FullName>{userData.name}</FullName>
          <LoginName>({userData.login})</LoginName>
        </>
      ) : (
        <>
          <FullName>{userData.login}</FullName>
        </>
      )}
    </Container>
  );
};

export default Username;
