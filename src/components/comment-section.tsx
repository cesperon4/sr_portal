import { timeAgo } from "@/lib/time";
import { type PostComment } from "../../generated/graphql";

type CommentSectionProps = {
  comments: PostComment[];
};

export default function CommentSection({ comments }: CommentSectionProps) {
  return (
    <div className="mt-6 space-y-4">
      {comments?.map((comment) => {
        if (!comment) return null;

        return (
          <div
            key={comment.id}
            className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-neutral-900"
          >
            <div className="mb-1 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-medium text-gray-800 dark:text-gray-200">
                {comment.user?.username ?? "Anonymous"}
              </span>
              <span>•</span>
              <span>{timeAgo(comment.updatedAt)}</span>
            </div>

            <p className="text-gray-800 dark:text-gray-100">{comment.body}</p>
          </div>
        );
      })}
    </div>
  );
}
