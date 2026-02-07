"use client";

import { useGetPosts } from "@/hooks/community/useGetPosts";
import {
  BarChart3,
  Compass,
  Flame,
  Home,
  MapPin,
  PlusCircle,
  Settings,
} from "lucide-react";
import Feed from "./feed";

function CommunityContainer() {
  const { posts, loading, error } = useGetPosts({ limit: 10 });

  return (
    <div className="flex w-full min-h-0 bg-white dark:bg-neutral-950">
      {/* Left sidebar - Reddit-style nav */}
      <aside className="hidden lg:flex w-60 flex-shrink-0 flex-col border-r border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 py-4">
        <div className="px-3 pb-3">
          <h2 className="text-body-sm font-semibold text-gray-900 dark:text-white px-3 py-1.5">
            Community
          </h2>
          <a
            href="/community/submit?returnView=Community"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <PlusCircle className="size-4 shrink-0" strokeWidth={1.5} />
            Create Post
          </a>
        </div>
        <nav className="flex flex-col gap-0.5 px-2">
          <a
            href="#"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40"
          >
            <Home className="size-4 shrink-0" strokeWidth={1.5} />
            Home
          </a>
          <button
            type="button"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors text-left w-full"
          >
            <Flame className="size-4 shrink-0" strokeWidth={1.5} />
            Popular
          </button>
          <button
            type="button"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors text-left w-full"
          >
            <Compass className="size-4 shrink-0" strokeWidth={1.5} />
            Explore
          </button>
          <button
            type="button"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors text-left w-full"
          >
            <MapPin className="size-4 shrink-0" strokeWidth={1.5} />
            Near you
          </button>
        </nav>
        <div className="mt-6 border-t border-gray-100 dark:border-neutral-800 pt-4 px-2">
          <p className="text-label text-gray-500 dark:text-gray-400 px-3 pb-2">
            Resources
          </p>
          <button
            type="button"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors text-left w-full"
          >
            <BarChart3 className="size-4 shrink-0" strokeWidth={1.5} />
            Insights
          </button>
          <button
            type="button"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors text-left w-full"
          >
            <Settings className="size-4 shrink-0" strokeWidth={1.5} />
            Settings
          </button>
        </div>
      </aside>

      {/* Center - Feed */}
      <main className="flex-1 min-w-0 flex flex-col max-w-3xl mx-auto w-full border-x border-gray-200 dark:border-neutral-800">
        <Feed posts={posts} loading={loading} error={error} />
      </main>

      {/* Right sidebar */}
      <aside className="hidden xl:flex w-80 flex-shrink-0 flex-col border-l border-gray-200 dark:border-neutral-800 bg-gray-50/50 dark:bg-neutral-900/30 py-4 px-4">
        <div className="rounded-lg border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-4">
          <h3 className="text-subheading text-gray-900 dark:text-white mb-2">
            r/SR Portal
          </h3>
          <p className="text-body-sm text-gray-600 dark:text-gray-400 mb-4">
            Community discussions and posts about Santa Rosa public safety and local incidents.
          </p>
          <button
            type="button"
            className="w-full rounded-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 px-4 transition-colors"
          >
            Join
          </button>
        </div>
        <div className="mt-4 rounded-lg border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-body-sm font-semibold text-gray-900 dark:text-white">
              Recent posts
            </h3>
            <button
              type="button"
              className="text-caption text-blue-600 dark:text-blue-400 hover:underline"
            >
              Clear
            </button>
          </div>
          <p className="text-caption text-gray-500 dark:text-gray-400">
            Your recent post activity will appear here.
          </p>
        </div>
      </aside>
    </div>
  );
}

export default CommunityContainer;
