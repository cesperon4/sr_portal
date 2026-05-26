"use client";

import CommentBox from "@/components/community/comment-box";
import { useUserContext } from "@/context/UserContext";
import { timeAgo } from "@/lib/time";
import Link from "next/link";
import { FiShield } from "react-icons/fi";
import { IoIosArrowBack } from "react-icons/io";
import {
  useCreatePostCommentMutation,
  useGetPostQuery,
} from "../../../generated/graphql";
import CommentSection from "../../components/comment-section";
import PostFooter from "../../components/community/post-footer";
import { ImageCarousel } from "../ui/image-carousel";
import { Loader } from "../ui/loader";
import { Map } from "./map";
import PostMenu from "./post-menu";

interface PostDetailProps {
  id: number;
}

function PostDetail({ id }: PostDetailProps) {
  const { loggedUser } = useUserContext();
  const [createPostComment] = useCreatePostCommentMutation();

  const { data, loading, error, refetch } = useGetPostQuery({
    variables: { id },
  });

  if (loading) return <Loader text="Fetching post details..." />;
  if (error) return <div>Error: {error.message}</div>;
  if (!data?.post) return <div>Post not found</div>;

  const images = data.post.imageUrls || [];

  const submitComment = (text: string) => {
    createPostComment({
      variables: {
        data: {
          postId: data.post.id,
          userId: loggedUser.id,
          body: text,
        },
      },
      onCompleted: () => refetch(),
      onError: (error) => console.error("Error creating comment:", error),
    });
  };

  return (
    <article className="mx-auto my-10 w-full max-w-3xl px-4">
      {/* Back Navigation */}
      <Link
        href={{ pathname: "/dashboard", query: { view: "Community" } }}
        className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:underline"
      >
        <IoIosArrowBack />
        Back to Community
      </Link>

      {/* Post Card */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-neutral-900">
        {/* Header */}
        <header className="flex items-center gap-2 px-6 pt-5 text-sm text-gray-500 dark:text-gray-400">
          <FiShield size={16} className="text-blue-500" />
          <span>{timeAgo(data.post.createdAt)}</span>
          <div className="ml-auto">
            <PostMenu
              postId={data.post.id}
              postOwnerId={data.post.userId}
              redirectOnDelete="/dashboard?view=Community"
            />
          </div>
        </header>

        {/* Title + Author */}
        <div className="px-6 pt-4">
          <span className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {data.post.user?.username}
          </span>
          <h1 className="mt-1 text-2xl font-semibold leading-tight text-gray-900 dark:text-white">
            {data.post.title}
          </h1>
        </div>

        {/* Media Section */}
        {(images.length > 0 || (data.post.lat && data.post.lon)) && (
          <div className="mt-4 space-y-4 px-6">
            {/* Images */}
            {images.length > 0 && (
              <div className="overflow-hidden rounded-xl">
                <ImageCarousel images={images} title={data.post.title} />
              </div>
            )}

            {/* Map */}
            {data.post.lat && data.post.lon && (
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-3 dark:border-gray-700 dark:bg-neutral-800">
                <Map
                  coordinates={{ x: data.post.lat, y: data.post.lon }}
                  openMapModal={() => {}}
                />
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  Approximate location
                </p>
              </div>
            )}
          </div>
        )}

        {/* Body */}
        {data.post.body && (
          <div className="px-6 py-5">
            <p className="whitespace-pre-line text-base leading-relaxed text-gray-800 dark:text-gray-200">
              {data.post.body}
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="border-t border-gray-100 px-6 py-4 dark:border-gray-800">
          <PostFooter post={data.post} />
        </div>
      </div>

      {/* Comment Composer */}
      <div className="mt-6">
        <CommentBox onSubmit={submitComment} />
      </div>

      {/* Comments */}
      <CommentSection comments={data.post.postComments} />
      {/* <div className="mt-6 space-y-4">
        {data.post.postComments?.map((comment) => {
          if (!comment) return null;

          return (
            <div
              key={comment.id}
              className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-neutral-900"
            >
              <div className="mb-1 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  {comment.user?.username ?? "Anonymous"}
                </span>
                <span>•</span>
                <span>{timeAgo(comment.updatedAt)}</span>
              </div>

              <p className="text-gray-800 dark:text-gray-100">{comment.body}</p>
            </div>
          );
        })}
      </div> */}
    </article>
  );
}

export default PostDetail;
