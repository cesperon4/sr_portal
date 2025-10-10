import React from "react";
import Post from "./post";
import Header from "./header";
import { useGetPostsQuery } from "../../../generated/graphql";

function Feed() {
  const { data, loading, error } = useGetPostsQuery();

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div className="flex flex-col gap-2 w-11/12 md:w-6/12">
      <Header />
      {data?.posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}

export default Feed;
