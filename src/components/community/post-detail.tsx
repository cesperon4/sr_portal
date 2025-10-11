"use client";
import React from "react";
import { useGetPostQuery } from "../../../generated/graphql";
import { FiShield } from "react-icons/fi";
import { HiDotsHorizontal } from "react-icons/hi";
import Image from "next/image";
import PostFooter from "../../components/community/post-footer";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";
import CommentBox from "@/components/community/comment-box";
import { useCreatePostCommentMutation } from "../../../generated/graphql";

interface PostDetailProps {
  id: string;
}
function PostDetail({ id }: PostDetailProps) {
  const [createPostComment] = useCreatePostCommentMutation();
  const { data, loading, error, refetch } = useGetPostQuery({
    variables: { id },
  });

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data?.post) {
    return <div>Post not found</div>;
  }

  console.log(data);

  const submitComment = (text: string) => {
    // Implement comment submission logic here

    createPostComment({
      variables: { data: { postId: data.post.id, body: text } },
      onCompleted: (data) => {
        console.log("Comment created: ", data);
        refetch();
      },
      onError: (error) => {
        console.log("Error creating comment: ", error);
      },
    });
  };

  return (
    <article className="flex flex-col gap-4 w-11/12 md:w-6/12 mx-auto my-8">
      <Link href={{ pathname: "/dashboard", query: { view: "Community" } }}>
        <div className="flex items-center gap-2">
          <IoIosArrowBack />
          <span>Back</span>
        </div>
      </Link>

      <div className="shadow w-full cursor-pointer px-8 py-2 border border-gray-300 rounded-xl">
        <div className="post-header flex gap-2 items-center">
          <FiShield size={18} />
          <span>sr/dui</span>
          <span>2 days ago</span>
          <HiDotsHorizontal size={18} className="ml-auto" />
        </div>
        <span>{data.post.user?.username}</span>

        <h1 className="text-2xl font-bold">{data.post.title}</h1>

        <Image
          aria-hidden
          src={data.post?.imageUrl || "/police_img.jpg"}
          alt={data.post.title || "Post image"}
          width={500}
          height={200}
          className="w-full my-4 rounded-3xl mx-auto shadow-md border border-gray-300"
        />

        <PostFooter commentCount={data.post?.postComments?.length || 0} />
      </div>

      <CommentBox onSubmit={submitComment} />

      {data.post?.postComments?.map((comment) => {
        if (!comment) return null; // skip null comments
        return (
          <div key={comment.id}>
            <p>{comment.body}</p>
          </div>
        );
      })}
    </article>
  );
}

export default PostDetail;
