import Head from 'next/head';
import SearchUser from '../components/SearchUser';

const Home = (): JSX.Element => {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>{<SearchUser />}</main>
    </div>
  );
};

export default Home;
