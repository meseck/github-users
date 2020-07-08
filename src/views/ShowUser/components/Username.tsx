import { UsersGetByUsernameResponseData } from '@octokit/types';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const FullName = styled.h1`
  margin: 0;
  font-weight: 600;
`;

const LoginName = styled.h2`
  margin: 0;
  font-weight: 400;
`;

type Props = {
  userData: UsersGetByUsernameResponseData;
};

const Username = ({ userData }: Props): JSX.Element => {
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
