# 🪝 `useSWRLite` — Custom React Hook for Data Caching (SWR Pattern)

A minimal React hook that mimics the behavior of `swr` using in-memory caching and the **Stale‑While‑Revalidate** pattern.

---

## ✨ Features

- In-memory cache using `Map`
- Returns cached data immediately (if available)
- Revalidates in the background using `fetcher`
- Optional:
  - `revalidateOnFocus`: refresh when tab gains focus
  - `revalidateOnReconnect`: refresh when connection is restored
- Manual cache update via `mutate()`

---

## 🔧 Usage

```tsx
import { useSWRLite } from "./useSWRLite";

function App() {
  const { data, error, isLoading, mutate } = useSWRLite(
    "post-1",
    () =>
      fetch("https://jsonplaceholder.typicode.com/posts/1").then((res) =>
        res.json()
      ),
    { revalidateOnFocus: true, revalidateOnReconnect: true }
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>{data.title}</h1>
      <button onClick={mutate}>🔄 Refresh</button>
    </div>
  );
}
```
