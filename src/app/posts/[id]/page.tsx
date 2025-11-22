// import { notFound } from "next/navigation";

import PostDetail from "@/components/community/post-detail";

// Define params as a Promise
type Params = Promise<{ id: string }>;

export default async function PostPage({ params }: { params: Params }) {
  // Await the params promise
  const { id } = await params;

  // You could fetch your post here
  // const post = await fetchPost(id);
  // if (!post) return notFound();

  return <PostDetail id={parseInt(id, 10)} />;
}
