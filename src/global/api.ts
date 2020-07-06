import { request } from '@octokit/request';

import { UsersGetByUsernameResponseData } from '@octokit/types';

export const fetchUser = async (
  username: string
): Promise<UsersGetByUsernameResponseData> => {
  // Fetch data from GitHub API with @octokit/request
  try {
    const result = await request('GET /users/{username}', {
      username: username,
      accept: 'application/vnd.github.v3+json',
    });
    return result.data;
  } catch (error) {
    throw new Error(error);
  }
};
