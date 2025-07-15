import React from 'react'
import './App.css'
import { useSWRLite } from './hooks';

const fetchPost = async (id: number) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
};

function App() {
  const [postId, setPostId] = React.useState(1);

  const { data, error, isLoading, mutate } = useSWRLite(
    `post-${postId}`,
    () => fetchPost(postId),
    {
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    }
  );

  return (
    <div>
      <h2>Post #{postId}</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error.message}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
      <button onClick={() => setPostId((p) => p - 1)} disabled={postId === 1}>
        ← Prev
      </button>
      <button onClick={() => setPostId((p) => p + 1)}>Next →</button>
      <button onClick={mutate}>♻️ Refresh</button>
    </div>
  );
}

export default App
