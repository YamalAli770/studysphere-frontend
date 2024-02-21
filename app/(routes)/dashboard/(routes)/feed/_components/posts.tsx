import { fetchPosts } from '@/lib/data/post';
import Post from './post';

export default async function Posts() {
  const posts = await fetchPosts();
  
  return (
    <>
        {posts?.map((post) => (
            <Post key={post.id} post={post} />
        ))}
    </>
  )
}
