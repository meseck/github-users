// Next.js Dynamic Routes: https://nextjs.org/docs/routing/dynamic-routes

import Head from 'next/head';
import { useRouter } from 'next/router';
import { useFetchUser } from '../../global/hooks';

const User = (): JSX.Element => {
  const router = useRouter();
  const { username } = router.query;

  const { userData, isLoading, isError } = useFetchUser(username);

  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {isLoading && !isError ? (
          <div>Is loading...</div>
        ) : (
          <>
            <p>{userData.login}</p>
            <p>{userData.name}</p>
          </>
        )}
      </main>
    </div>
  );
};

export default User;
