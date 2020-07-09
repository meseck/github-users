// Next.js Dynamic Routes: https://nextjs.org/docs/routing/dynamic-routes

import Head from 'next/head';
import { useRouter } from 'next/router';

import Main from '../../containers/Main';
import Card from '../../containers/Card';
import ShowUser from '../../views/ShowUser/ShowUser';

const User = (): JSX.Element => {
  const router = useRouter();
  const { username } = router.query;

  return (
    <div>
      <Head>
        <title>{username}&#039; Profile | GitHub Users</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>
        <Card>
          <ShowUser username={username} />
        </Card>
      </Main>
    </div>
  );
};

export default User;
