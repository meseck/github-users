import { act, renderHook } from '@testing-library/react-hooks';
import { useFetchUser } from '../../global/hooks';
import { server } from '../setupMockServer';
import { cache } from 'swr';
import { rest } from 'msw';

// Start mock server before all tests begins
beforeAll(() => server.listen());

// Stop mock server after all tests are completed
afterAll(() => server.close());

// Clear cache of SWR before each test to always get new results
afterEach(() => cache.clear());

describe('Hooks', () => {
  describe('useFetchUser', () => {
    it('should handle the argument as a request parameters and return data', async () => {
      const { result, waitForNextUpdate } = renderHook(() =>
        // Pass { dedupingInterval: 0 } as option to prevent caching
        useFetchUser('fools-mate', { dedupingInterval: 0 })
      );

      // Wait for async useFetchUser Hook to be fulfilled | rejected
      await waitForNextUpdate();

      act(() => {
        cache.clear();
      });

      expect(result.current.userData).toStrictEqual({
        login: 'fools-mate',
        name: "Fool's Mate",
      });
    });

    it('should set isLoading correctly when data is still fetching and no error appeared', async () => {
      const { result } = renderHook(() =>
        // Pass { dedupingInterval: 0 } as option to prevent caching
        useFetchUser('fools-mate', { dedupingInterval: 0 })
      );

      expect(result.current.isLoading).toBe(true);
      expect(result.current.userData).toBe(undefined);
      expect(result.current.isError).toBe(undefined);
    });

    it('should return an Error when user was not found', async () => {
      server.use(
        // Setup request handler to response with status: 404 - Not Found
        rest.get(
          'https://api.github.com/users/non-existent-user',
          (req, res, ctx) => {
            return res(ctx.status(404));
          }
        )
      );

      const { result, waitForNextUpdate } = renderHook(() =>
        // Pass { dedupingInterval: 0 } as option to prevent caching
        useFetchUser('non-existent-user', { dedupingInterval: 0 })
      );

      // Wait for async useFetchUser Hook to be fulfilled | rejected
      await waitForNextUpdate();

      expect(result.current.isError).toStrictEqual(Error('HttpError'));
    });
  });
});
