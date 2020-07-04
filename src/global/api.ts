import { request } from '@octokit/request';
import { UserData } from './types';

export const fetchUser = async (username: string): Promise<UserData> => {
  // Fetch data from GitHub API with @octokit/request
  try {
    const result = await request('GET /users/{username}', {
      username: username,
    });
    return result.data;
  } catch (error) {
    throw new Error(error);
  }
};
