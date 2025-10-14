import React from "react";
import { FiShield } from "react-icons/fi";
import { HiDotsHorizontal } from "react-icons/hi";
import Image from "next/image";
import PostFooter from "./post-footer";
import { GetPostsQuery } from "../../../generated/graphql";
import Link from "next/link";

type PostType = GetPostsQuery["posts"]["posts"][number];

type PostProps = { post: PostType };

function Post({ post }: PostProps) {
  return (
    <Link href={`/posts/${post.id}`} className="block">
      <div className="shadow w-full cursor-pointer px-8 py-2 border-gray-300">
        <div className="post-header flex gap-2 items-center">
          <FiShield size={18} />
          <span>sr/dui</span>
          <span>2 days ago</span>

          <HiDotsHorizontal size={18} className="ml-auto" />
        </div>
        <span>{post.user?.username}</span>
        <h2 className="font-medium text-lg">{post.title}</h2>
        <Image
          aria-hidden
          src={post.imageUrl || "/police_img.jpg"}
          alt="Window icon"
          width={500}
          height={200}
          className="w-full h-150 my-4 rounded-3xl mx-auto shadow-md border border-gray-300"
        />

        <PostFooter commentCount={post.postComments?.length || 0} />
      </div>
    </Link>
  );
}

export default Post;
