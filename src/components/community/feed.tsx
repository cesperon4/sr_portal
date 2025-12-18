"use client";

import { useGetPosts } from "@/hooks/community/useGetPosts";
import { Loader } from "../ui/loader";
import Post from "./post";
import PostButton from "./post-button";
function Feed() {
  const { posts, loading, error } = useGetPosts({ limit: 5 });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white w-full ">
        <Loader text={"Fetching posts ..."} />
      </div>
    );
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (loading && posts.length === 0)
    return (
      <div className="flex items-center justify-center min-h-screen bg-white w-full ">
        <Loader text={"Fetching posts ..."} />
      </div>
    );
  return (
    <div className="flex flex-col gap-2 w-11/12 md:w-4/12">
      <PostButton text="Create Post" returnView="Community" />

      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}

export default Feed;
