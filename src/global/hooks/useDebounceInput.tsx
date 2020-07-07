import { useEffect, useState } from 'react';

export const useDebounceInput = (value: string, delay: number): string => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const debounce = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(debounce);
    };
  }, [value, delay]);

  return debouncedValue;
};
