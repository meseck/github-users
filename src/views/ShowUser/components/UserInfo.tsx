import { UsersGetByUsernameResponseData } from '@octokit/types';
import styled from 'styled-components';
import {
  IoMdGlobe,
  IoMdBriefcase,
  IoMdMail,
  IoLogoTwitter,
  IoLogoGithub,
  IoMdPerson,
} from 'react-icons/io';

type Props = {
  userData: UsersGetByUsernameResponseData;
};

const Container = styled.div`
  margin-bottom: 2rem;
`;

const Bio = styled.p`
  font-size: 1.25rem;
  line-height: 1.75rem;
`;

const AdditionalInfo = styled.div`
  p {
    margin: 0.83rem 0;
  }
`;

const UserInfo = ({ userData }: Props): JSX.Element => {
  return (
    <Container>
      {userData.bio && <Bio>{userData.bio.trim()}</Bio>}
      <AdditionalInfo>
        {userData.location && (
          <p>
            <IoMdGlobe /> {userData.location}
          </p>
        )}
        {userData.company && (
          <p>
            <IoMdBriefcase /> {userData.company}
          </p>
        )}
        {userData.email && (
          <p>
            <IoMdMail /> {userData.email}
          </p>
        )}
        {userData.twitter_username && (
          <p>
            <IoLogoTwitter /> {userData.twitter_username}
          </p>
        )}
        <p>
          <IoLogoGithub /> Since {new Date(userData.created_at).getFullYear()}
        </p>
        <div>
          <p>
            <IoMdPerson /> {userData.followers} followers · {userData.following}{' '}
            following
          </p>
        </div>
      </AdditionalInfo>
    </Container>
  );
};

export default UserInfo;
