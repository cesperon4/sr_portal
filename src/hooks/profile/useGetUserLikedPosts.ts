import { useMemo } from "react";
import type { Post } from "../../../generated/graphql";
import { useGetUserLikedPostsQuery } from "../../../generated/graphql";

type Props = {
  limit: number;
  id: string;
};

export function useGetUserLikedPosts({ limit, id }: Props) {
  const { data, loading, error, fetchMore } = useGetUserLikedPostsQuery({
    variables: {
      id,
      data: { limit, cursor: null },
    },
  });

  const likedPosts: Post[] = useMemo(() => {
    return (
      data?.user?.data?.likedPosts?.data?.data
        ?.map((like) => like?.post)
        ?.filter((post): post is Post => Boolean(post)) ?? []
    );
  }, [data]);

  return { likedPosts, loading, error, fetchMore };
}
