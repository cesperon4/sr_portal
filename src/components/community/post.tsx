import { timeAgo } from "@/lib/time";
import Link from "next/link";
import React from "react";
import { FiShield } from "react-icons/fi";
import { HiDotsHorizontal } from "react-icons/hi";
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
    <Link href={`/posts/${post.id}`} className="block focus:outline-none">
      <article
        className="
          group relative flex flex-col w-full h-full
          rounded-2xl bg-white
          shadow-[0_4px_20px_rgba(0,0,0,0.06)]
          border border-gray-100
          transition-all duration-200
          hover:shadow-[0_10px_30px_rgba(0,0,0,0.10)]
          hover:-translate-y-[1px]
        "
      >
        {/* Header */}
        <header className="flex items-center gap-2 px-5 pt-4 pb-3">
          <div className="flex items-center gap-1.5 text-blue-600">
            <FiShield size={16} />
            <span className="text-xs font-medium uppercase tracking-wide">
              Verified
            </span>
          </div>

          <span className="text-xs text-gray-400 ml-2">
            {timeAgo(post.createdAt)}
          </span>

          <button
            className="
              ml-auto rounded-full p-1.5
              text-gray-400
              hover:bg-gray-100 hover:text-gray-600
              transition
            "
            aria-label="Post actions"
            onClick={(e) => e.preventDefault()}
          >
            <HiDotsHorizontal size={18} />
          </button>
        </header>

        {/* Title & Author */}
        <div className="px-5 pb-3">
          <span className="block text-sm font-medium text-gray-700">
            @{post.user?.username}
          </span>

          <h2
            className="
              mt-1 text-lg font-semibold leading-snug
              text-gray-900
              line-clamp-2
            "
          >
            {post.title}
          </h2>
        </div>

        {/* Images */}
        {images.length > 0 && (
          <div className="px-5 pb-4">
            <div className="overflow-hidden rounded-xl">
              <ImageCarousel images={images} title={post.title} />
            </div>
          </div>
        )}
        {/* Map */}
        {post.lon && post.lat && (
          <div className="px-5 pb-4">
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
              <Map
                coordinates={{ x: post.lat, y: post.lon }}
                openMapModal={() => {}}
              />
            </div>
          </div>
        )}

        {/* Footer */}
        <footer
          className="
            mt-auto px-5 py-4
            border-t border-gray-100
            bg-gray-50/60
            rounded-b-2xl
          "
        >
          <PostFooter post={post} />
        </footer>
      </article>
    </Link>
  );
};

export default Post;
