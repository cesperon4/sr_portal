import { useGetPosts } from "@/hooks/community/useGetPosts";
import Feed from "./feed";

function CommunityContainer() {
  const { posts, loading, error } = useGetPosts({ limit: 5 });

  console.log("posts: ", posts);

  return (
    <div className="flex justify-center w-full">
      <Feed posts={posts} />
    </div>
  );
}

export default CommunityContainer;
