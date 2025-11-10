"use client";
import React from "react";
import {
  useGetPostQuery,
  useCreatePostCommentMutation,
} from "../../../generated/graphql";
import { FiShield } from "react-icons/fi";
import { HiDotsHorizontal } from "react-icons/hi";
import PostFooter from "../../components/community/post-footer";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";
import CommentBox from "@/components/community/comment-box";
import { timeAgo } from "@/lib/time";
import { useUserContext } from "@/context/UserContext";
import { ImageCarousel } from "../ui/image-carousel";

interface PostDetailProps {
  id: string;
}

function PostDetail({ id }: PostDetailProps) {
  const { loggedUser } = useUserContext();
  const [createPostComment] = useCreatePostCommentMutation();
  const { data, loading, error, refetch } = useGetPostQuery({
    variables: { id },
  });

  if (error) return <div>Error: {error.message}</div>;
  if (loading) return <div>Loading...</div>;
  if (!data?.post) return <div>Post not found</div>;

  const images = data.post.imageUrls || [];

  const submitComment = (text: string) => {
    createPostComment({
      variables: {
        data: { postId: data.post.id, userId: loggedUser.id, body: text },
      },
      onCompleted: () => refetch(),
      onError: (error) => console.error("Error creating comment:", error),
    });
  };

  return (
    <article className="flex flex-col gap-4 w-11/12 md:w-4/12 mx-auto my-8 h-full">
      {/* Back Link */}
      <Link href={{ pathname: "/dashboard", query: { view: "Community" } }}>
        <div className="flex items-center gap-2 text-blue-500 hover:underline">
          <IoIosArrowBack />
          <span>Back</span>
        </div>
      </Link>

      {/* Post Card */}
      <div className="shadow w-full px-8 py-4 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-neutral-900">
        <div className="post-header flex gap-2 items-center mb-2 text-gray-600 dark:text-gray-300">
          <FiShield size={18} />
          <span>sr/dui</span>
          <span>• {timeAgo(data.post.createdAt)}</span>
          <HiDotsHorizontal size={18} className="ml-auto" />
        </div>

        <span className="font-semibold block mb-1">
          {data.post.user?.username}
        </span>
        <h1 className="text-2xl font-bold mb-3">{data.post.title}</h1>

        {/* Image Carousel */}
        <ImageCarousel images={images} title={data.post.title} />

        {/* Body */}
        {data.post.body && (
          <p className="text-gray-800 dark:text-gray-200 mb-3 whitespace-pre-line">
            {data.post.body}
          </p>
        )}

        <PostFooter commentCount={data.post?.postComments?.length || 0} />
      </div>

      {/* Comment Box */}
      <CommentBox onSubmit={submitComment} />

      {/* Comments */}
      <div className="flex flex-col gap-4">
        {data.post?.postComments?.map((comment) => {
          if (!comment) return null;
          return (
            <div
              key={comment.id}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 shadow-sm"
            >
              <div className="comment-header flex gap-2 items-center text-sm text-gray-600 dark:text-gray-300 mb-1">
                <span className="font-semibold">
                  {comment.user?.username ?? "Anonymous"}
                </span>
                <span>• {timeAgo(comment.updatedAt)}</span>
              </div>
              <p className="ml-2 text-gray-800 dark:text-gray-100">
                {comment.body}
              </p>
            </div>
          );
        })}
      </div>
    </article>
  );
}

export default PostDetail;
