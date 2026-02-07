"use client";

import { useUserContext } from "@/context/UserContext";
import { gql } from "@apollo/client";
import clsx from "clsx";
import { ArrowBigUp, MessageCircle, Share2, Bookmark } from "lucide-react";
import { useMemo } from "react";
import {
  useToggleLikeMutation,
  type Like,
  type Post,
} from "../../../generated/graphql";

interface PostFooterProps {
  post: Post;
}

function PostFooter({ post }: PostFooterProps) {
  const [toggleLikeMutation] = useToggleLikeMutation();
  const { loggedUser } = useUserContext();

  const hasLiked = useMemo(() => {
    const like = post.likes.find((like) => like.userId === loggedUser.id);
    return like?.isActive ?? false;
  }, [post.likes, loggedUser.id]);

  const likeCount = post.likes.filter((like) => like.isActive === true).length;
  const commentCount = post.postComments?.length ?? 0;

  const toggleLike = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!post) return;
    const userLike = post.likes.find((l: Like) => l.userId === loggedUser.id);
    const isLiking = !userLike?.isActive;
    const tempId = userLike?.id ?? -Math.floor(Math.random() * 1000000);

    await toggleLikeMutation({
      variables: { data: { userId: loggedUser.id, postId: post.id } },
      optimisticResponse: {
        toggleLike: {
          __typename: "ApiLikeResponse",
          status: 200,
          message: "Optimistic update",
          data: {
            __typename: "Like",
            id: tempId,
            postId: post.id,
            userId: loggedUser.id,
            isActive: isLiking,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        },
      },
      update: (cache, { data }) => {
        const updatedLike = data?.toggleLike?.data;
        if (!updatedLike) return;
        cache.modify({
          id: cache.identify({ __typename: "Post", id: post.id }),
          fields: {
            likes(existingLikes = []) {
              const index = existingLikes.findIndex(
                (l: Like) => cache.identify(l) === cache.identify(updatedLike)
              );
              if (index >= 0) {
                const updated = [...existingLikes];
                updated[index] = cache.writeFragment({
                  data: updatedLike,
                  fragment: gql`
                    fragment LikeFragment on Like {
                      id
                      postId
                      userId
                      isActive
                      createdAt
                      updatedAt
                    }
                  `,
                });
                return updated;
              }
              return [
                ...existingLikes,
                cache.writeFragment({
                  data: updatedLike,
                  fragment: gql`
                    fragment LikeFragment on Like {
                      id
                      postId
                      userId
                      isActive
                      createdAt
                      updatedAt
                    }
                  `,
                }),
              ];
            },
          },
        });
      },
    });
  };

  return (
    <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
      {/* Upvote */}
      <button
        onClick={toggleLike}
        className={clsx(
          "flex items-center gap-1 rounded-md px-2 py-1.5 text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-neutral-800",
          hasLiked
            ? "text-orange-500 dark:text-orange-400"
            : "hover:text-orange-500 dark:hover:text-orange-400"
        )}
        aria-label={hasLiked ? "Remove upvote" : "Upvote"}
      >
        <ArrowBigUp
          className={clsx("size-4 shrink-0", hasLiked && "fill-current")}
          strokeWidth={1.5}
        />
        <span>{likeCount}</span>
      </button>

      {/* Comments */}
      <div className="flex items-center gap-1 rounded-md px-2 py-1.5 text-sm font-medium hover:bg-gray-100 dark:hover:bg-neutral-800 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
        <MessageCircle className="size-4 shrink-0" strokeWidth={1.5} />
        <span>{commentCount}</span>
      </div>

      {/* Share */}
      <button
        type="button"
        className="flex items-center gap-1 rounded-md px-2 py-1.5 text-sm font-medium hover:bg-gray-100 dark:hover:bg-neutral-800 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
        aria-label="Share"
      >
        <Share2 className="size-4 shrink-0" strokeWidth={1.5} />
        <span>Share</span>
      </button>

      {/* Save */}
      <button
        type="button"
        className="flex items-center gap-1 rounded-md px-2 py-1.5 text-sm font-medium hover:bg-gray-100 dark:hover:bg-neutral-800 hover:text-gray-700 dark:hover:text-gray-300 transition-colors ml-auto"
        aria-label="Save"
      >
        <Bookmark className="size-4 shrink-0" strokeWidth={1.5} />
        <span>Save</span>
      </button>
    </div>
  );
}

export default PostFooter;
