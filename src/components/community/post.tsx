import React, { useState } from "react";
import { FiShield } from "react-icons/fi";
import { HiDotsHorizontal } from "react-icons/hi";
import Image from "next/image";
import PostFooter from "./post-footer";
import { GetPostsQuery } from "../../../generated/graphql";
import Link from "next/link";
import { timeAgo } from "@/lib/time";

type PostType = GetPostsQuery["posts"]["posts"][number];

type PostProps = { post: PostType };

function Post({ post }: PostProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentImageIndex((prev) =>
      prev === 0 ? (post.imageUrls?.length || 1) - 1 : prev - 1
    );
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentImageIndex((prev) =>
      prev === (post.imageUrls?.length || 1) - 1 ? 0 : prev + 1
    );
  };

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

        {post.imageUrls && post.imageUrls.length > 0 && (
          <div className="relative w-full h-[35vh] my-4 rounded-xl overflow-hidden shadow-md border border-gray-300">
            <Image
              src={post.imageUrls[currentImageIndex] ?? ""}
              alt={post.title || "Post image"}
              fill
              className="object-cover w-full h-full"
            />

            {post.imageUrls.length > 1 && (
              <>
                {/* Previous Button */}
                <button
                  onClick={handlePrevImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-40 text-white rounded-full p-2 hover:bg-opacity-60 transition"
                >
                  ◀
                </button>

                {/* Next Button */}
                <button
                  onClick={handleNextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-40 text-white rounded-full p-2 hover:bg-opacity-60 transition"
                >
                  ▶
                </button>
              </>
            )}
          </div>
        )}

        <PostFooter commentCount={post.postComments?.length || 0} />
      </div>
    </Link>
  );
}

export default Post;
