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
    fetchPolicy: "cache-first", // only fetch if cache is empty
    nextFetchPolicy: "cache-and-network", // optional background update
  }); //refetch the posts using refetch { data, loading, error, refetch}}

  const posts = useMemo(() => data?.posts?.data?.posts ?? [], [data]); //useMemo ensures that posts only changes when data changes, not on every render.
  const loadMore = async () => {
    if (data?.posts?.data?.hasNextPage === false) return; // No more posts to load

    console.log("limit: ", LIMIT);
    console.log("cursor: ", data?.posts?.data?.cursor);
    await fetchMore({
      variables: { data: { limit: LIMIT, cursor: data?.posts?.data?.cursor } },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult?.posts?.data?.posts) return prev;
        console.log("prev: ", prev);
        console.log("fetch more results: ", fetchMoreResult);

        return {
          posts: {
            __typename: prev.posts.__typename,
            data: {
              posts: [
                ...(prev.posts.data?.posts ?? []),
                ...fetchMoreResult.posts?.data.posts?.filter(
                  (p) => !prev.posts.data?.posts.some((old) => old.id === p.id)
                ), // avoids duplicates
              ],
              cursor: fetchMoreResult.posts?.data?.cursor,
              hasNextPage: fetchMoreResult.posts?.data?.hasNextPage,
            },
            status: fetchMoreResult.posts.status,
            message: fetchMoreResult.posts.message,
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
