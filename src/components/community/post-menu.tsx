"use client";

import { useUserContext } from "@/context/UserContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useDeletePostMutation } from "../../../generated/graphql";

type PostMenuProps = {
  postId: number;
  postOwnerId: string;
  onDeleted?: (postId: number) => void;
  redirectOnDelete?: string;
  className?: string;
};

export default function PostMenu({
  postId,
  postOwnerId,
  onDeleted,
  redirectOnDelete,
  className,
}: PostMenuProps) {
  const { loggedUser } = useUserContext();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const isOwner =
    Boolean(loggedUser?.id) && loggedUser.id === String(postOwnerId);

  const [deletePost, { loading }] = useDeletePostMutation({
    variables: { id: postId },
    update(cache, { data }) {
      const deletedId = data?.deletePost?.id;
      if (!deletedId) return;

      const cacheId = cache.identify({ __typename: "Post", id: deletedId });
      if (cacheId) cache.evict({ id: cacheId });

      cache.modify({
        fields: {
          posts(existing, { readField, DELETE }) {
            const list = readField<{ data?: unknown[] }>("data", existing);
            const inner = list?.data;
            if (!Array.isArray(inner)) return existing;

            const next = inner.filter(
              (ref) => readField<number>("id", ref) !== deletedId,
            );
            if (next.length === inner.length) return existing;

            return {
              ...existing,
              data: { ...list, data: next },
            };
          },
          mapPosts(existing, { readField }) {
            const inner = readField<unknown[]>("data", existing);
            if (!Array.isArray(inner)) return existing;

            const next = inner.filter(
              (ref) => readField<number>("id", ref) !== deletedId,
            );
            if (next.length === inner.length) return existing;

            return { ...existing, data: next };
          },
        },
      });

      cache.gc();
    },
    onError(err) {
      console.error("[deletePost] failed:", err.message);
    },
  });

  const handleDelete = useCallback(
    async (e: Event | React.SyntheticEvent) => {
      if ("preventDefault" in e) e.preventDefault();
      if ("stopPropagation" in e && typeof e.stopPropagation === "function") {
        e.stopPropagation();
      }

      const confirmed = window.confirm(
        "Delete this post? This action can't be undone.",
      );
      if (!confirmed) return;

      try {
        const result = await deletePost();
        if (result.data?.deletePost?.id) {
          onDeleted?.(result.data.deletePost.id);
          if (redirectOnDelete) router.push(redirectOnDelete);
        }
      } finally {
        setOpen(false);
      }
    },
    [deletePost, onDeleted, redirectOnDelete, router],
  );

  if (!isOwner) {
    return (
      <button
        type="button"
        className={
          className ??
          "p-1.5 rounded hover:bg-gray-200 dark:hover:bg-neutral-700 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors shrink-0"
        }
        aria-label="Post options"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <MoreHorizontal className="size-4" strokeWidth={1.5} />
      </button>
    );
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={
            className ??
            "p-1.5 rounded hover:bg-gray-200 dark:hover:bg-neutral-700 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors shrink-0"
          }
          aria-label="Post options"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <MoreHorizontal className="size-4" strokeWidth={1.5} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        onClick={(e) => e.stopPropagation()}
        className="min-w-40"
      >
        <DropdownMenuItem
          onSelect={handleDelete}
          disabled={loading}
          className="text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950/30 cursor-pointer"
        >
          <Trash2 className="size-4" strokeWidth={1.5} />
          <span>{loading ? "Deleting…" : "Delete post"}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
