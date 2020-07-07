import { request } from '@octokit/request';
import {
  SearchUsersResponseData,
  UsersGetByUsernameResponseData,
} from '@octokit/types';

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

export const searchUser = async (
  username: string,
  currentPage: number,
  entriesPerPage: number
): Promise<SearchUsersResponseData> => {
  // Fetch data from GitHub API with @octokit/request
  try {
    const result = await request('GET /search/users', {
      q: `${username}+in:login`,
      accept: 'application/vnd.github.v3+json',
      per_page: entriesPerPage,
      page: currentPage,
    });
    return result.data;
  } catch (error) {
    throw new Error(error);
  }
};
