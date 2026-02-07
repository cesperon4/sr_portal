"use client";

import { timeAgo } from "@/lib/time";
import Link from "next/link";
import React from "react";
import { MoreHorizontal } from "lucide-react";
import { GetPostsQuery } from "../../../generated/graphql";
import { ImageCarousel } from "../ui/image-carousel";
import { Map } from "./map";
import PostFooter from "./post-footer";

type PostType = NonNullable<
  NonNullable<GetPostsQuery["posts"]>["data"]
>["data"][number];

interface PostProps {
  post: PostType;
}

const Post: React.FC<PostProps> = ({ post }) => {
  const images = post.imageUrls || [];

  return (
    <Link href={`/posts/${post.id}`} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded">
      <article className="group flex flex-col w-full border-b border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 hover:bg-gray-50/50 dark:hover:bg-neutral-900/50 transition-colors">
        {/* Reddit-style header: community/user + time + menu */}
        <header className="flex items-center gap-2 px-4 pt-3 pb-1">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 shrink-0">
              r/SR Portal
            </span>
            <span className="text-gray-300 dark:text-gray-600">•</span>
            <span className="text-caption truncate">
              Posted by u/{post.user?.username ?? "unknown"}
            </span>
            <span className="text-gray-300 dark:text-gray-600">•</span>
            <span className="text-caption text-gray-500 dark:text-gray-400 shrink-0">
              {timeAgo(post.createdAt)}
            </span>
          </div>
          <button
            className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-neutral-700 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors shrink-0"
            aria-label="Post options"
            onClick={(e) => e.preventDefault()}
          >
            <MoreHorizontal className="size-4" strokeWidth={1.5} />
          </button>
        </header>

        {/* Title */}
        <div className="px-4 pt-1 pb-2">
          <h2 className="text-base font-semibold leading-snug text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {post.title}
          </h2>
        </div>

        {/* Content: images */}
        {images.length > 0 && (
          <div className="px-4 pb-3">
            <div className="overflow-hidden rounded-md border border-gray-200 dark:border-neutral-700">
              <ImageCarousel images={images} title={post.title} />
            </div>
          </div>
        )}

        {/* Map */}
        {post.lon != null && post.lat != null && (
          <div className="px-4 pb-3">
            <div className="overflow-hidden rounded-md border border-gray-200 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-800/50">
              <Map
                coordinates={{ x: post.lat, y: post.lon }}
                openMapModal={() => {}}
              />
            </div>
          </div>
        )}

        {/* Reddit-style action bar */}
        <footer className="px-4 pb-3">
          <PostFooter post={post} />
        </footer>
      </article>
    </Link>
  );
};

export default Post;
