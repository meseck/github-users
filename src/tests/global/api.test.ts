import { fetchUser, searchUser } from '../../global/api';
import { server } from '../setupMockServer';
import { rest } from 'msw';

// Start mock server before all tests begins
beforeAll(() => server.listen());

// Stop mock server after all tests are completed
afterAll(() => server.close());

// Reset all request handlers after each test (rest.get, rest.post, etc...)
afterEach(() => server.resetHandlers());

describe('API', () => {
  describe('fetchUser', () => {
    it('should handle the argument as a request parameter and return data', async () => {
      const user = await fetchUser('fools-mate');

      expect(user).toStrictEqual({ login: 'fools-mate' });
    });

    it('should throw an error when the connection fails', async () => {
      server.use(
        // Setup request handler to response with status: 404 - Not Found
        rest.get('https://api.github.com/users/:user', (req, res, ctx) => {
          return res(ctx.status(404));
        })
      );

      await expect(fetchUser('unknown-user')).rejects.toThrow('HttpError');
    });
  });

  describe('searchUser', () => {
    it('should return data', async () => {
      const searchData = await searchUser('user', 1, 10);

      expect(searchData.items).not.toBeNull();
    });

    it('should return different data when new page is fetched', async () => {
      const searchData = await searchUser('user', 2, 10);

      expect(searchData.items).not.toBeNull();
      expect(searchData.items).toBe('different');
    });

    it('should adjust the number of items that are returned to the per-page request option', async () => {
      const searchData = await searchUser('user', 1, 10);

      expect(searchData.items).not.toBeNull();
      expect(searchData.items.length).toBe(10);
    });

    it('should return an empty items array when no user was found', async () => {
      const searchData = await searchUser('unknown-user', 1, 10);

      expect(searchData.items.length).toBe(0);
    });

    it('should throw an error when the connection fails', async () => {
      server.use(
        // Setup request handler to response with status: 404 - Not Found
        rest.get('https://api.github.com/search/*', (req, res, ctx) => {
          return res(ctx.status(404));
        })
      );

      await expect(searchUser('user', 1, 10)).rejects.toThrow('HttpError');
    });
  });
});
