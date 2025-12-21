import { useEffect, useMemo } from "react";
import { useGetPostsQuery } from "../../../generated/graphql";

type props = {
  limit: number;
};
export function useGetPosts({ limit }: props) {
  // const LIMIT = 5;

  const { data, loading, error, fetchMore, networkStatus } = useGetPostsQuery({
    variables: { data: { limit: limit, cursor: null } },
    fetchPolicy: "cache-first", // only fetch if cache is empty
    nextFetchPolicy: "cache-and-network", // optional background update
    // notifyOnNetworkStatusChange: true,
  }); //refetch the posts using refetch { data, loading, error, refetch}}

  // useEffect(() => {
  //   if (networkStatus === NetworkStatus.loading) {
  //     console.log("Initial network fetch");
  //   }

  //   if (networkStatus === NetworkStatus.ready) {
  //     console.log("Data ready (likely cache)");
  //   }

  //   if (networkStatus === NetworkStatus.fetchMore) {
  //     console.log("Fetching more from network");
  //   }

  //   if (networkStatus === NetworkStatus.refetch) {
  //     console.log("Refetching from network");
  //   }
  // }, [networkStatus]);

  const posts = useMemo(() => data?.posts?.data?.data ?? [], [data]); //useMemo ensures that posts only changes when data changes, not on every render.
  const hasNextPage = useMemo(
    () => data?.posts?.data?.hasNextPage ?? false,
    [data]
  );
  const cursor = useMemo(() => data?.posts?.data?.cursor, [data]);

  const loadMore = async () => {
    if (!hasNextPage) return; // No more posts to load

    await fetchMore({
      variables: { data: { limit: limit, cursor: cursor } },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult?.posts?.data?.data) return prev;

        return {
          posts: {
            __typename: prev.posts.__typename,
            data: {
              data: [
                ...(prev.posts.data?.data ?? []),
                ...fetchMoreResult.posts?.data.data?.filter(
                  (p) => !prev.posts.data?.data.some((old) => old.id === p.id)
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
  }, [loadMore]);

  return { posts, loading, error, hasNextPage, cursor, loadMore };
}
