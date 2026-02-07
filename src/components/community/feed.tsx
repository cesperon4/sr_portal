"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import { type Post as FeedPost } from "../../../generated/graphql";
import Post from "./post";

type FeedProps = {
  posts: FeedPost[];
  loading?: boolean;
  error?: Error | null;
};

const SORT_OPTIONS = [
  { value: "best", label: "Best" },
  { value: "new", label: "New" },
  { value: "top", label: "Top" },
  { value: "hot", label: "Hot" },
] as const;

function Feed({ posts, loading, error }: FeedProps) {
  return (
    <div className="flex flex-col min-h-0 ">
      {/* Feed toolbar - Reddit style */}
      <div className="sticky top-0 z-10 flex items-center gap-2 border-b border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 px-4 py-2">
        <div className="flex items-center gap-1 rounded-md border border-gray-200 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-800/50">
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
                opt.value === "best"
                  ? "bg-white dark:bg-neutral-800 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
        <Link
          href="/community/submit?returnView=Community"
          className="ml-auto flex items-center gap-1.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 transition-colors"
          aria-label="Create post"
        >
          <Plus className="size-4 shrink-0" strokeWidth={2} />
          Create Post
        </Link>
      </div>

      {/* Post list */}
      <div className="flex flex-col">
        {error && (
          <div className="px-4 py-6 text-center text-body-sm text-red-600 dark:text-red-400">
            Failed to load posts. Please try again.
          </div>
        )}
        {loading && posts.length === 0 && (
          <div className="px-4 py-12 text-center text-body-sm text-gray-500 dark:text-gray-400">
            Loading posts...
          </div>
        )}
        {!loading && !error && posts.length === 0 && (
          <div className="px-4 py-12 text-center text-body-sm text-gray-500 dark:text-gray-400">
            No posts yet. Be the first to create one.
          </div>
        )}
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default Feed;
