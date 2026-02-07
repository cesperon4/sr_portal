"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginateProps {
  count: number;
  setCurrentPage: (page: number) => void;
  currentPage?: number;
}

export function Paginate({
  count,
  setCurrentPage,
  currentPage = 1,
}: PaginateProps) {
  if (count <= 1) return null;

  const prevDisabled = currentPage <= 1;
  const nextDisabled = currentPage >= count;

  const pages: (number | "ellipsis")[] = (() => {
    if (count <= 7) {
      return Array.from({ length: count }, (_, i) => i + 1);
    }
    const result: (number | "ellipsis")[] = [];
    if (currentPage <= 3) {
      result.push(1, 2, 3, 4, "ellipsis", count);
    } else if (currentPage >= count - 2) {
      result.push(1, "ellipsis", count - 3, count - 2, count - 1, count);
    } else {
      result.push(
        1,
        "ellipsis",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "ellipsis",
        count,
      );
    }
    return result;
  })();

  return (
    <nav
      className="flex items-center justify-center gap-2"
      aria-label="Pagination"
    >
      <div className="flex items-center gap-1 p-1.5 rounded-2xl bg-gray-100/80 dark:bg-neutral-800/50">
        <button
          type="button"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={prevDisabled}
          className="flex items-center justify-center size-9 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-neutral-700/80 hover:text-gray-900 dark:hover:text-white disabled:opacity-40 disabled:pointer-events-none transition-colors duration-200"
          aria-label="Previous page"
        >
          <ChevronLeft className="size-5" strokeWidth={1.5} />
        </button>

        <div className="flex items-center gap-0.5 mx-1">
          {pages.map((page, i) =>
            page === "ellipsis" ? (
              <span
                key={`ellipsis-${i}`}
                className="flex items-center justify-center min-w-[2rem] h-9 px-1 text-gray-400 dark:text-gray-500 text-sm"
                aria-hidden
              >
                …
              </span>
            ) : (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                className={`flex items-center justify-center min-w-[2.25rem] h-9 px-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  page === currentPage
                    ? "bg-white dark:bg-neutral-700/80 text-gray-900 dark:text-white shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:bg-white/70 dark:hover:bg-neutral-700/60 hover:text-gray-900 dark:hover:text-white"
                }`}
                aria-label={`Page ${page}`}
                aria-current={page === currentPage ? "page" : undefined}
              >
                {page}
              </button>
            ),
          )}
        </div>

        <button
          type="button"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={nextDisabled}
          className="flex items-center justify-center size-9 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-neutral-700/80 hover:text-gray-900 dark:hover:text-white disabled:opacity-40 disabled:pointer-events-none transition-colors duration-200"
          aria-label="Next page"
        >
          <ChevronRight className="size-5" strokeWidth={1.5} />
        </button>
      </div>

      <span className="text-caption text-gray-500 dark:text-gray-400 ml-1">
        {currentPage} of {count}
      </span>
    </nav>
  );
}
