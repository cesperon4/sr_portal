import React, { useMemo } from "react";
import { FaRegComment } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { PiShareFat } from "react-icons/pi";
import { type Like } from "../../../generated/graphql";
import { useUserContext } from "@/context/UserContext";
import clsx from "clsx";
import { useToggleLikeMutation } from "../../../generated/graphql";
import { type Post } from "../../../generated/graphql";
import { gql } from "@apollo/client";

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

  const toggleLike = async () => {
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
        console.log("updating cache");
        const updatedLike = data?.toggleLike?.data;
        console.log("updated like: ", updatedLike);
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

              // Add new like as a reference
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
    <div className="footer-container flex gap-2">
      <div className="flex items-center gap-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl">
        <FaRegComment />
        <span className="text-sm">{post.postComments.length}</span>
      </div>
      <div
        onClick={(e) => {
          e.preventDefault();
          toggleLike();
        }}
        className={clsx(
          "flex items-center px-4 py-2 cursor-pointer rounded-xl",
          {
            "bg-green-100 hover:bg-green-200": hasLiked,
            "bg-gray-100 hover:bg-gray-200": !hasLiked,
          }
        )}
      >
        <AiOutlineLike />
        <span className="text-sm">
          {post.likes.filter((like) => like.isActive === true).length}
        </span>
      </div>
      <div className="flex items-center px-4 py-2 gap-1 bg-gray-100 hover:bg-gray-200 rounded-xl cursor-pointer">
        <PiShareFat />
        <span className="text-sm">Share</span>
      </div>
    </div>
  );
}

export default PostFooter;
