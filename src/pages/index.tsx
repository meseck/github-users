import Head from 'next/head';
import { useFetchUser } from '../global/hooks';

const Home = (): JSX.Element => {
  const { userData, isLoading, isError } = useFetchUser('fools-mate');
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

export default Home;
