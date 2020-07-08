// Next.js Dynamic Routes: https://nextjs.org/docs/routing/dynamic-routes

import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';

import { useFetchUser } from '../../global/hooks/useFetchUser';
import { usernameValidation } from '../../global/utils';

import Main from '../../containers/Main';
import Card from '../../containers/Card';
import ShowUser from '../../views/ShowUser/ShowUser';

const User = (): JSX.Element => {
  const router = useRouter();
  const { username } = router.query;

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
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>
        <Card>
          {userData && <ShowUser userData={userData} />}
          {isError && !validInput && (
            <>
              <h1>This is not valid GitHub username.</h1>
              <p>The GitHub username constraints are:</p>
              <ul>
                <li>Must not be longer than 39 characters.</li>
                <li>
                  Can only consist of letters, numbers and simple hyphens.
                </li>
                <li>Must not begin or end with a hyphen.</li>
                <li>Cannot have consecutive hyphens.</li>
              </ul>
            </>
          )}
          {!userData && !isLoading && isError && (
            <>
              <h1>
                No one with the username &quot;{username}&quot; was found on
                GitHub.
              </h1>
              <Link href="/">Please go back to continue your search.</Link>
            </>
          )}
        </Card>
      </Main>
    </div>
  );
};

export default User;
