import { fetchPostById } from "@/lib/data/post";
import { notFound } from "next/navigation";
import PostView from "../../_components/post-view";

interface PostModalProps {
    params: {
        id: string;
    }
}

export default async function PostModal({ params: { id } }: PostModalProps) {
  const post = await fetchPostById(id);

  if(!post) {
    notFound();
  }

  return (
    // <PostView id={id} post={post} />
    <></>
  )
}
