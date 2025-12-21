import { useMemo } from "react";
import { useGetUserCommentsQuery } from "../../../generated/graphql";

type props = {
  limit: number;
  id: string;
};
export function useGetUserComments({ limit, id }: props) {
  const { data, loading, error, fetchMore } = useGetUserCommentsQuery({
    variables: {
      id: id,
      data: { limit: 5, cursor: null },
    },
  });

  const userComments = useMemo(
    () => data?.user?.data?.comments?.data?.data ?? [],
    [data]
  ); //useMemo ensures that posts only changes when data changes, not on every render.

  return { userComments };
}
