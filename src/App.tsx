/* eslint-disable @typescript-eslint/no-explicit-any */
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

async function getPosts(page:number=0) {
  const response = await fetch(POSTS_URL + "?page="+page);
  const postsData: Post[] = await response.json();
  return postsData;
}


function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>();
  const [page, setPage] = useState(0);

function handleNextPage(){
  setPage((oldPage)=>oldPage +1);
}


  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const postsData = await getPosts(page);
        setPosts(postsData);
      } catch (e: any) {
        console.log(e);
        setError(e);
      }

      setLoading(false);
    })();
  }, [page]);

  if (error) {
    return (

      <div>Hatalı içerik bulundu , Lütfen tekrar deneyiniz</div>
    )
  }

  if (loading) {
    return <div> Yükleniyor...</div>
  }

  return (
    <>
      <h1>React Apı Bağlama</h1>
      <div><button onClick={handleNextPage}>Sonraki sayfa</button></div>
      {posts.map((post) => (
        <li key={post.id}>
          <div style={{ backgroundColor: "gold", color: "black" }}>{post.title}</div>
          <div>{post.body}</div></li>
      ))}
    </>
  )
}

export default App;