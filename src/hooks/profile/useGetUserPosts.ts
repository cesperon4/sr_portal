import { useMemo } from "react";
import { useGetUserPostsQuery } from "../../../generated/graphql";

type props = {
  limit: number;
  id: string;
};
export function useGetUserPosts({ limit, id }: props) {
  const { data, loading, error, fetchMore } = useGetUserPostsQuery({
    variables: {
      id: id,
      data: { limit: 5, cursor: null },
    },
  });

  const posts = useMemo(
    () => data?.user?.data?.posts?.data?.data ?? [],
    [data]
  ); //useMemo ensures that posts only changes when data changes, not on every render.

  return { userPosts: posts };
}
