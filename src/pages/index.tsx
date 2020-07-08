import Head from 'next/head';
import SearchUser from '../views/SearchUser/SearchUser';
import Main from '../containers/Main';
import Card from '../containers/Card';

const Home = (): JSX.Element => {
  return (
    <div className="container">
      <Head>
        <title>Search | GitHub Users</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>
        <Card>{<SearchUser />}</Card>
      </Main>
    </div>
  );
};

export default Home;
