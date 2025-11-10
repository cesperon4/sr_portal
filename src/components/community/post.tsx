import React from "react";
import { FiShield } from "react-icons/fi";
import { HiDotsHorizontal } from "react-icons/hi";
import PostFooter from "./post-footer";
import { GetPostsQuery } from "../../../generated/graphql";
import Link from "next/link";
import { timeAgo } from "@/lib/time";
import { ImageCarousel } from "../ui/image-carousel";

type PostType = GetPostsQuery["posts"]["posts"][number];

type PostProps = { post: PostType };

function Post({ post }: PostProps) {
  const images = post.imageUrls || [];

  return (
    <Link href={`/posts/${post.id}`} className="block h-[50vh]">
      <div className="shadow w-full cursor-pointer px-4 py-2 border border-gray-300 rounded-xl h-full">
        <div className="post-header flex gap-2 items-center mb-2">
          <FiShield size={18} className="text-blue-500" />
          <span>{`created ${timeAgo(post.createdAt)}`}</span>
          <HiDotsHorizontal size={18} className="ml-auto" />
        </div>

        <span className="font-semibold">{post.user?.username}</span>
        <h2 className="font-medium text-lg">{post.title}</h2>

        <ImageCarousel images={images} title={post.title} />

        <PostFooter commentCount={post.postComments?.length || 0} />
      </div>
    </Link>
  );
}

export default Post;
