import { type GetUserCommentsQuery } from "../../../generated/graphql";

type CommentsResponse = NonNullable<
  NonNullable<
    NonNullable<NonNullable<GetUserCommentsQuery["user"]>["data"]>["comments"]
  >["data"]
>["data"];

type ProfileCommentsProps = {
  comments: CommentsResponse;
};
export default function ProfileComments({ comments }: ProfileCommentsProps) {
  return (
    <section aria-label="Comments" className="flex flex-col gap-2">
      {comments.map((comment) => (
        <article
          key={comment.id}
          className="flex flex-col border-y-1 border-gray-100 p-4 hover:bg-gray-50 cursor-pointer text-sm"
        >
          <div className="flex gap-2">
            <header>
              <span className="bg-green-50 p-1 rounded-xl">
                {comment.post?.category}
              </span>
              <span>{comment.post?.title}</span>
            </header>
          </div>
          <span>{`commented on ${comment.createdAt}`}</span>

          <p>{comment.body}</p>
        </article>
      ))}
    </section>
  );
}
