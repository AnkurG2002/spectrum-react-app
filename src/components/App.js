import { useEffect, useState } from 'react';
import { getPosts } from '../api';
import { Home } from '../pages';
import { Loader, Navbar } from './';

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      const res = await getPosts();
      console.log('response:', res);

      if (res.success) {
        setPosts(res.data.posts);
      }

      setLoading(false);
    }

    fetchPosts();
  }, []);

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="App">
      <Navbar />
      <Home posts={posts} />
    </div>
  );
}

export default App;
