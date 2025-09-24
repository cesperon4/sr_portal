import React from "react";
import Post from "./post";
import Header from "./header";
function Feed() {
  return (
    <div className="flex flex-col gap-2 w-11/12 md:w-6/12">
      <Header />
      <Post />
      <Post />
      <Post />
      <Post />
    </div>
  );
}

export default Feed;
