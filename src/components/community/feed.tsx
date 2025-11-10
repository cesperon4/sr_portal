"use client";

import React from "react";
import Post from "./post";
// import Header from "./header";
import { useGetPostsQuery } from "../../../generated/graphql";
import { useEffect, useMemo } from "react";

function Feed() {
  const LIMIT = 5;
  const { data, loading, error, fetchMore } = useGetPostsQuery({
    variables: { data: { limit: LIMIT, cursor: null } },
    fetchPolicy: "cache-and-network",

  }); //refetch the posts using refetch { data, loading, error, refetch}}

  const posts = useMemo(() => data?.posts.posts ?? [], [data]); //useMemo ensures that posts only changes when data changes, not on every render.
  const loadMore = async () => {
    if (data?.posts.hasNextPage === false) return; // No more posts to load
    await fetchMore({
      variables: { data: { limit: LIMIT, cursor: data?.posts.cursor } },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;

        return {
          posts: {
            __typename: prev.posts.__typename,
            posts: [
              ...prev.posts.posts,
              ...fetchMoreResult.posts.posts.filter(
                (p) => !prev.posts.posts.some((old) => old.id === p.id)
              ), // avoids duplicates
            ],
            cursor: fetchMoreResult.posts.cursor,
            hasNextPage: fetchMoreResult.posts.hasNextPage,
          },
        };
      },
    });
  };
  // Optional: infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 200
      ) {
        loadMore();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [posts]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (loading && posts.length === 0) return <p>Loading...</p>;
  return (
    <div className="flex flex-col gap-2 w-11/12 md:w-4/12">
      {/* <Header /> */}
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}

export default Feed;
