import { useCallback, useState } from 'react';

const useAsync = <T>(asyncFunction: (...args: unknown[]) => Promise<T>) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<T | null>(null);

  const execute = useCallback(
    async (...args: unknown[]) => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await asyncFunction(...args);
        setData(result);
        return result;
      } catch (err) {
        setError(err as Error);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [asyncFunction]
  );

  return { execute, data, isLoading, error };
};

export default useAsync;
