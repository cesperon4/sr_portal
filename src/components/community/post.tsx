import React from "react";
import { FiShield } from "react-icons/fi";
import { HiDotsHorizontal } from "react-icons/hi";
import Link from "next/link";
import { GetPostsQuery } from "../../../generated/graphql";
import { timeAgo } from "@/lib/time";
import { ImageCarousel } from "../ui/image-carousel";
import PostFooter from "./post-footer";

type PostType = GetPostsQuery["posts"]["posts"][number];

interface PostProps {
  post: PostType;
}

const Post: React.FC<PostProps> = ({ post }) => {
  const images = post.imageUrls || [];

  return (
    <Link href={`/posts/${post.id}`} className="block">
      <article className="flex flex-col h-full w-full cursor-pointer border border-gray-300 rounded-xl shadow-sm px-4 py-3 hover:shadow-md transition-shadow duration-200">
        {/* Post Header */}
        <header className="flex items-center gap-2 mb-2">
          <FiShield size={18} className="text-blue-500" />
          <span className="text-sm text-gray-500">{`created ${timeAgo(post.createdAt)}`}</span>
          <HiDotsHorizontal size={18} className="ml-auto text-gray-500" />
        </header>

        {/* User and Title */}
        <div className="mb-2">
          <span className="font-semibold text-gray-800">{post.user?.username}</span>
          <h2 className="font-medium text-lg text-gray-900">{post.title}</h2>
        </div>

        {/* Images */}
        {images.length > 0 && <ImageCarousel images={images} title={post.title} />}

        {/* Post Footer */}
        <footer className="mt-auto">
          <PostFooter commentCount={post.postComments?.length || 0} />
        </footer>
      </article>
    </Link>
  );
};

export default Post;
