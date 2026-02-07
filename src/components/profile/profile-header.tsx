import { type ProfileView } from "@/types/profile.types";
import { FileText, Heart, MessageCircle } from "lucide-react";
import React from "react";

type ProfileHeaderProps = {
  currentView: ProfileView;
  setCurrentView: React.Dispatch<React.SetStateAction<ProfileView>>;
};

const PROFILE_TABS: { title: ProfileView; icon: React.ElementType }[] = [
  { title: "My Posts", icon: FileText },
  { title: "Comments", icon: MessageCircle },
  { title: "Likes", icon: Heart },
];

export default function ProfileHeader({
  currentView,
  setCurrentView,
}: ProfileHeaderProps) {
  return (
    <div className="w-full border-b border-gray-100 dark:border-neutral-800/80 bg-white dark:bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav
          className="flex items-center gap-1 py-3"
          role="tablist"
          aria-label="Profile sections"
        >
          {PROFILE_TABS.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.title;
            return (
              <button
                key={item.title}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setCurrentView(item.title)}
                className={`
                  relative flex items-center gap-2.5 rounded-lg px-4 py-2.5 text-sm font-medium tracking-tight
                  transition-colors duration-200
                  ${
                    isActive
                      ? "text-gray-900 dark:text-white"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                  }
                `}
              >
                <Icon
                  className="size-[1.125rem] shrink-0"
                  strokeWidth={1.5}
                  aria-hidden
                />
                <span>{item.title}</span>
                <span
                  className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-blue-500 dark:bg-blue-400 transition-all duration-300 ease-out origin-left ${
                    isActive ? "scale-x-100" : "scale-x-0"
                  }`}
                  aria-hidden
                />
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
