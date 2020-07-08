import Head from 'next/head';
import SearchUser from '../views/SearchUser/SearchUser';
import Main from '../containers/Main';

const Home = (): JSX.Element => {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>{<SearchUser />}</Main>
    </div>
  );
};

export default Home;
