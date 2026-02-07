import { useUserContext } from "@/context/UserContext";
import { useGetUserComments } from "@/hooks/profile/useGetUserComments";
import { useGetUserLikedPosts } from "@/hooks/profile/useGetUserLikedPosts";
import { useGetUserPosts } from "@/hooks/profile/useGetUserPosts";
import { type ProfileView } from "@/types/profile.types";
import { useState } from "react";
import Feed from "../community/feed";
import ProfileComments from "./profile-comments";
import ProfileHeader from "./profile-header";

export default function ProfileWrapper() {
  const { loggedUser } = useUserContext();
  const { userPosts } = useGetUserPosts({
    limit: 5,
    id: loggedUser.id,
  });

  const { userComments } = useGetUserComments({ limit: 5, id: loggedUser.id });
  const { likedPosts } = useGetUserLikedPosts({ limit: 5, id: loggedUser.id });

  console.log("liked_posts: ", likedPosts);

  const [currentView, setCurrentView] = useState<ProfileView>("My Posts");
  return (
    <div className="flex w-full flex-col items-center gap-2 bg-white dark:bg-neutral-950">
      <ProfileHeader
        currentView={currentView}
        setCurrentView={setCurrentView}
      />
      {currentView === "My Posts" && <Feed posts={userPosts} />}
      {currentView === "Likes" && <Feed posts={likedPosts} />}
      {currentView === "Comments" && (
        <ProfileComments comments={userComments} />
      )}
    </div>
  );
}
