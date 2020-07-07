import { renderHook } from '@testing-library/react-hooks';
import { useDebounceInput } from '../../../global/hooks/useDebounceInput';

describe('useDebounceInput', function () {
  it('should return the input', () => {
    const input = 'test';
    const { result } = renderHook(() => useDebounceInput(input, 1000));

    expect(result.current).toBe(input);
  });

  it('should call setTimeout with delay argument', () => {
    const delay = 1000;

    jest.useFakeTimers();

    renderHook(() => useDebounceInput('test', delay));

    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
  });
});
