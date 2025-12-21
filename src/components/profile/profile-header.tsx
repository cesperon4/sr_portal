import { type ProfileView } from "@/types/profile.types";
import { clsx } from "clsx";
import React from "react";
import { FaRegComment, FaRegHeart } from "react-icons/fa";
import { LuSignpost } from "react-icons/lu";

type ProfileHeaderProps = {
  currentView: ProfileView;
  setCurrentView: React.Dispatch<React.SetStateAction<ProfileView>>;
};
export default function ProfileHeader({
  currentView,
  setCurrentView,
}: ProfileHeaderProps) {
  const headerItems = [
    { title: "My Posts", icon: <LuSignpost /> },
    { title: "Comments", icon: <FaRegComment /> },
    { title: "Likes", icon: <FaRegHeart /> },
  ];

  return (
    <div className="flex justify-center">
      <nav className="shadow p-2 rounded-xl text-sm">
        <ul className="flex gap-4">
          {headerItems.map((item) => (
            <li
              onClick={() => {
                setCurrentView(item.title as ProfileView);
              }}
              className={clsx(
                "flex items-center gap-1 cursor-pointer hover:bg-gray-100 rounded-xl p-2",
                { "bg-gray-100": currentView === item.title }
              )}
              key={item.title}
            >
              <span>{item.icon}</span>
              <span>{item.title}</span>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
