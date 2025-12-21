"use client";

import { type Post as FeedPost } from "../../../generated/graphql";
import Post from "../../components/community/post";
import PostButton from "./post-button";

type FeedProps = {
  posts: FeedPost[];
};
function Feed({ posts }: FeedProps) {
  return (
    <div className="flex flex-col gap-2 w-11/12 md:w-4/12">
      <PostButton text="Create Post" returnView={"Community"} />

      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}

export default Feed;
