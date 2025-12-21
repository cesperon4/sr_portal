"use client";

import { useUserContext } from "@/context/UserContext";
import { HeaderSelect } from "@/types/header.interface";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CiSettings, CiUser } from "react-icons/ci";
import { FaPeopleGroup } from "react-icons/fa6";
import { IoMdBook } from "react-icons/io";
import { IoMapOutline } from "react-icons/io5";
import { MdInsights } from "react-icons/md";
import { ModeToggle } from "../components/mode-toggle";
import UnderlineButton from "./ui/underline-button";
import WeatherWrapper from "./weather/weather-wrapper";

interface HeaderProps {
  view: HeaderSelect;
  toggleView: (view: HeaderSelect) => void;
  setIsProfileSettingsOpen: (arg: boolean) => void;
}

export function Header({
  view,
  toggleView,
  setIsProfileSettingsOpen,
}: HeaderProps) {
  const { loggedUser, clearLoggedUser } = useUserContext();
  const router = useRouter();

  const handleLogout = async () => {
    clearLoggedUser();
    await signOut({ redirect: false });
    router.replace("/");
  };

  return (
    <header className="mt-4 mx-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-neutral-950 shadow-sm">
      <div className="mx-auto flex gap-4 h-16 max-w-7xl items-center px-6">
        {/* Brand */}
        <div className="flex items-center gap-4">
          <Image
            src="/logo4.png"
            alt="SR Portal"
            width={40}
            height={40}
            className="rounded-full border border-gray-200 dark:border-gray-700"
          />
          <span className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
            SR Portal
          </span>
        </div>

        <WeatherWrapper />

        {/* Navigation */}
        <nav className="ml-1 flex items-center gap-6">
          <UnderlineButton
            clickMethod={() => toggleView("Profile")}
            view="Profile"
            currentView={view}
          >
            <CiUser className="text-base" />

            <span className="text-sm">Profile</span>
          </UnderlineButton>
          <UnderlineButton
            clickMethod={() => toggleView("Map")}
            view="Map"
            currentView={view}
          >
            <IoMapOutline className="text-base" />
            <span className="text-sm">Map</span>
          </UnderlineButton>

          <UnderlineButton
            clickMethod={() => toggleView("Table")}
            view="Table"
            currentView={view}
          >
            <IoMdBook className="text-base" />
            <span className="text-sm">Logs</span>
          </UnderlineButton>

          <UnderlineButton
            clickMethod={() => toggleView("Chart")}
            view="Chart"
            currentView={view}
          >
            <MdInsights className="text-base" />
            <span className="text-sm">Insights</span>
          </UnderlineButton>

          <UnderlineButton
            clickMethod={() => toggleView("Community")}
            view="Community"
            currentView={view}
          >
            <FaPeopleGroup className="text-base" />
            <span className="text-sm">Community</span>
          </UnderlineButton>
        </nav>

        {/* Right Actions */}
        <div className="ml-auto flex items-center gap-2">
          <ModeToggle />

          {/* User */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {loggedUser.username || loggedUser.role}
            </span>

            {loggedUser.image && (
              <Image
                src={loggedUser.image}
                alt="Profile"
                width={36}
                height={36}
                className="rounded-full border border-gray-200 dark:border-gray-700"
              />
            )}

            <CiSettings
              size={22}
              className="cursor-pointer text-gray-500 transition-colors hover:text-gray-800 dark:hover:text-white"
              onClick={() => setIsProfileSettingsOpen(true)}
            />
          </div>

          {/* Logout */}
          <UnderlineButton clickMethod={handleLogout}>
            <span className="text-sm">Logout</span>
          </UnderlineButton>
          {/* <WeatherWrapper /> */}
        </div>
      </div>
    </header>
  );
}
