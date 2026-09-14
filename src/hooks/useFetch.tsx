import { useCallback, useEffect, useState } from "react";

type FetchState<T> = {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  status: number | null;
  refetch: () => void;
};

export function useFetch<T>(url: string | null): FetchState<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<number | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    if (!url) {
      setData(null);
      setIsLoading(false);
      setError(null);
      setStatus(null);
      return;
    }

    const controller = new AbortController();

    async function load(target: string) {
      try {
        setIsLoading(true);
        setError(null);
        setStatus(null);
        setData(null);

        const response = await fetch(target, { signal: controller.signal });
        setStatus(response.status);

        if (!response.ok) {
          const body = (await response.json().catch(() => null)) as {
            message?: string;
          } | null;

          throw new Error(body?.message ?? `Ошибка ${response.status}`);
        }
        const result: T = await response.json();
        setData(result);
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }

    load(url);

    return () => controller.abort();
  }, [url, retryCount]);

  const refetch = useCallback(() => {
    setRetryCount((c) => c + 1);
  }, []);

  return { data, isLoading, error, status, refetch };
}
