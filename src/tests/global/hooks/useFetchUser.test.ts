import { renderHook } from '@testing-library/react-hooks';
import { cache } from 'swr';
import { rest } from 'msw';

import { server } from '../../setupMockServer';
import { useFetchUser } from '../../../global/hooks/useFetchUser';

// Start mock server before all tests begins
beforeAll(() => server.listen());

// Stop mock server after all tests are completed
afterAll(() => server.close());

// Clear cache of SWR before each test to always get new results
afterEach(() => cache.clear());

describe('useFetchUser', () => {
  it('should handle the argument as a request parameters and return data', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      // Pass { dedupingInterval: 0 } as option to prevent caching
      useFetchUser('user', { dedupingInterval: 0 })
    );

    // Wait for async useFetchUser Hook to be fulfilled | rejected
    await waitForNextUpdate();

    expect(result.current.userData).toStrictEqual({
      login: 'user',
    });
  });

  it('should set states correctly when data is still fetching and no error appeared', async () => {
    const { result } = renderHook(() =>
      // Pass { dedupingInterval: 0 } as option to prevent caching
      useFetchUser('user', { dedupingInterval: 0 })
    );

    expect(result.current.isLoading).toBe(true);
    expect(result.current.userData).toBe(undefined);
    expect(result.current.isError).toBe(undefined);
  });

  it('should set isError when user was not found or connect failed', async () => {
    server.use(
      // Setup request handler to response with status: 404 - Not Found
      rest.get('https://api.github.com/users/unknown-user', (req, res, ctx) => {
        return res(ctx.status(404));
      })
    );

    const { result, waitForNextUpdate } = renderHook(() =>
      // Pass { dedupingInterval: 0 } as option to prevent caching
      useFetchUser('unknown-user', { dedupingInterval: 0 })
    );

    // Wait for async useFetchUser Hook to be fulfilled | rejected
    await waitForNextUpdate();

    expect(result.current.isError).toStrictEqual(Error('HttpError'));
  });
});
