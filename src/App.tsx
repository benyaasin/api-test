/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";

const BASE_URL = "https://jsonplaceholder.typicode.com"
const POSTS_URL = BASE_URL + "/posts";

interface Post {
  "userId": number,
  "id": number,
  "title": string,
  "body": string,
}

async function getPosts() {
  const response = await fetch(POSTS_URL);
  const postsData: Post[] = await response.json();
  return postsData;
}


function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);




  useEffect(() => {
    (async () => {
      setLoading(true);
      const postsData = await getPosts();
      setPosts(postsData);
      setLoading(false);
    })();
  }, []);

  if(loading){
    return <div> Yükleniyor...</div>
  }

  return (
    <>
      <h1>React Apı Bağlama</h1>
      {posts.map((post) => (
        <li key={post.id}>
          <div style={{ backgroundColor: "gold", color: "black" }}>{post.title}</div>
          <div>{post.body}</div></li>
      ))}
    </>
  )
}

export default App;