import { useMemo, useEffect } from "react";

import { useGetPostsQuery } from "../../../generated/graphql";

export function useGetPosts() {
  const LIMIT = 5;

  const { data, loading, error, fetchMore } = useGetPostsQuery({
    variables: { data: { limit: LIMIT, cursor: null } },
    fetchPolicy: "cache-first", // only fetch if cache is empty
    nextFetchPolicy: "cache-and-network", // optional background update
  }); //refetch the posts using refetch { data, loading, error, refetch}}

  const posts = useMemo(() => data?.posts?.data?.posts ?? [], [data]); //useMemo ensures that posts only changes when data changes, not on every render.
  const hasNextPage = useMemo(
    () => data?.posts?.data?.hasNextPage ?? false,
    [data]
  );
  const cursor = useMemo(() => data?.posts?.data?.cursor, [data]);

  const loadMore = async () => {
    if (!hasNextPage) return; // No more posts to load

    await fetchMore({
      variables: { data: { limit: LIMIT, cursor: cursor } },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult?.posts?.data?.posts) return prev;

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
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 300
      ) {
        loadMore();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [posts]);

  return { posts, loading, error, hasNextPage, cursor, loadMore };
}
