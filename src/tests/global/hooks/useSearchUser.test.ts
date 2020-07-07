import { renderHook } from '@testing-library/react-hooks';
import { cache } from 'swr';
import { rest } from 'msw';

import { useSearchUser } from '../../../global/hooks/useSearchUser';
import { server } from '../../setupMockServer';

// Start mock server before all tests begins
beforeAll(() => server.listen());

// Stop mock server after all tests are completed
afterAll(() => server.close());

// Clear cache of SWR before each test to always get new results
afterEach(() => cache.clear());

describe('useSearchUser', function () {
  it('should return data', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      // Pass { dedupingInterval: 0 } as option to prevent caching
      useSearchUser('user', 1, 10, { dedupingInterval: 0 })
    );

    // Wait for async useFetchUser Hook to be fulfilled | rejected
    await waitForNextUpdate();

    expect(result.current.searchData).not.toBeNull();
  });

  it('should set states correctly', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      // Pass { dedupingInterval: 0 } as option to prevent caching
      useSearchUser('user', 1, 10, { dedupingInterval: 0 })
    );

    expect(result.current.isLoading).toBe(true);
    expect(result.current.isValidInput).toBe(true);
    expect(result.current.searchData).toBe(undefined);
    expect(result.current.isError).toBe(undefined);

    await waitForNextUpdate();

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isValidInput).toBe(true);
    expect(result.current.searchData).not.toBeNull();
    expect(result.current.isError).toBe(undefined);
  });

  it('should check if input is invalid and set isValidInput to false', async () => {
    const { result } = renderHook(() =>
      // Pass { dedupingInterval: 0 } as option to prevent caching
      useSearchUser('-invalid-username-', 1, 10, { dedupingInterval: 0 })
    );

    expect(result.current.isValidInput).toBe(false);
    expect(result.current.validationErrorMsg).not.toBe('Invalid username');
  });

  it('should return different data when new page is fetched', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      // Pass { dedupingInterval: 0 } as option to prevent caching
      useSearchUser('user', 2, 10, { dedupingInterval: 0 })
    );

    // Wait for async useFetchUser Hook to be fulfilled | rejected
    await waitForNextUpdate();

    expect(result.current.searchData.items).toBe('different');
  });

  it('should adjust the number of items that are returned to the per-page request option', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      // Pass { dedupingInterval: 0 } as option to prevent caching
      useSearchUser('user', 1, 10, { dedupingInterval: 0 })
    );

    // Wait for async useFetchUser Hook to be fulfilled | rejected
    await waitForNextUpdate();

    expect(result.current.searchData.items.length).toBe(10);
  });

  it('should return an empty items array when no user was found', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      // Pass { dedupingInterval: 0 } as option to prevent caching
      useSearchUser('unknown-user', 1, 10, { dedupingInterval: 0 })
    );

    // Wait for async useFetchUser Hook to be fulfilled | rejected
    await waitForNextUpdate();

    expect(result.current.searchData.items.length).toBe(0);
  });

  it('should set isError when connection failed', async () => {
    server.use(
      // Setup request handler to response with status: 404 - Not Found
      rest.get('https://api.github.com/search/users', (req, res, ctx) => {
        return res(ctx.status(404));
      })
    );

    const { result, waitForNextUpdate } = renderHook(() =>
      // Pass { dedupingInterval: 0 } as option to prevent caching
      useSearchUser('unknown-user', 1, 10, { dedupingInterval: 0 })
    );

    // Wait for async useFetchUser Hook to be fulfilled | rejected
    await waitForNextUpdate();

    expect(result.current.isError).toStrictEqual(Error('HttpError'));
  });
});
