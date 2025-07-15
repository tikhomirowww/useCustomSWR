import { useState, useEffect } from "react";

// Простое хранилище кэша
const cache = new Map<string, any>();

type Options = {
  revalidateOnFocus?: boolean;
  revalidateOnReconnect?: boolean;
};

export function useSWRLite<T = any>(
  key: string,
  fetcher: () => Promise<T>,
  options?: Options
) {
  const [data, setData] = useState<T | undefined>(() => cache.get(key));
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(!cache.has(key));

  const revalidate = () => {
    setIsLoading(true);
    fetcher()
      .then((res) => {
        cache.set(key, res);
        setData(res);
        setError(null);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    console.log(cache);

    if (!cache.has(key)) {
      revalidate();
    }

    const onFocus = () => {
      if (options?.revalidateOnFocus) revalidate();
    };

    const onOnline = () => {
      if (options?.revalidateOnReconnect) revalidate();
    };

    window.addEventListener("focus", onFocus);
    window.addEventListener("online", onOnline);

    return () => {
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("online", onOnline);
    };
  }, [key]);

  return {
    data,
    error,
    isLoading,
    mutate: revalidate, // ручное обновление
  };
}
