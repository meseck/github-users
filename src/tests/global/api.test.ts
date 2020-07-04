import { fetchUser } from '../../global/api';
import { server } from '../setupMockServer';
import { rest } from 'msw';

// Start mock server before all tests begins
beforeAll(() => server.listen());

// Stop mock server after all tests are completed
afterAll(() => server.close());

// Reset all request handlers after each test (rest.get, rest.post, etc...)
afterEach(() => server.resetHandlers());

describe('API', () => {
  it('should handle the argument as a request parameters and return data', async () => {
    const user = await fetchUser('fools-mate');

    expect(user).toStrictEqual({ login: 'fools-mate', name: "Fool's Mate" });
  });

  it('should throw an error when connection fails', async () => {
    server.use(
      // Setup request handler to response with status: 404 - Not Found
      rest.get('https://api.github.com/users/:user', (req, res, ctx) => {
        return res(ctx.status(404));
      })
    );

    await expect(fetchUser('unknown')).rejects.toThrow('HttpError');
  });
});
