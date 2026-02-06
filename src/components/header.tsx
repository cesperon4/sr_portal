"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUserContext } from "@/context/UserContext";
import { HeaderSelect } from "@/types/header.interface";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CiSettings, CiUser } from "react-icons/ci";
import { FaPeopleGroup } from "react-icons/fa6";
import { IoMdBook } from "react-icons/io";
import { IoLogOutOutline, IoMapOutline } from "react-icons/io5";
import { MdInsights } from "react-icons/md";
import { ModeToggle } from "../components/mode-toggle";
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

  const navItems = [
    {
      id: "Profile",
      icon: CiUser,
      label: "Profile",
    },
    {
      id: "Map",
      icon: IoMapOutline,
      label: "Map",
    },
    {
      id: "Table",
      icon: IoMdBook,
      label: "Logs",
    },
    {
      id: "Chart",
      icon: MdInsights,
      label: "Insights",
    },
    {
      id: "Community",
      icon: FaPeopleGroup,
      label: "Community",
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 dark:bg-neutral-950/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 supports-[backdrop-filter]:dark:bg-neutral-950/80">
      <div className="mx-auto flex h-12 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Section */}
        <div className="flex items-center gap-2.5 flex-shrink-0">
          <div className="relative">
            <Image
              src="/logo4.png"
              alt="SR Portal"
              width={32}
              height={32}
              className="rounded-md border border-gray-200 dark:border-gray-700 shadow-sm transition-transform duration-200 hover:scale-105"
            />
            <div className="absolute inset-0 rounded-md bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              SR Portal
            </span>
            <span className="text-[9px] text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">
              Dashboard
            </span>
          </div>
        </div>

        {/* Weather Widget */}
        <div className="hidden md:flex items-center mx-4">
          <WeatherWrapper />
        </div>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-0.5 mx-4 flex-1 justify-center">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = view === item.id;
            return (
              <button
                key={item.id}
                onClick={() => toggleView(item.id as HeaderSelect)}
                className={`
                  relative group flex items-center gap-1.5 px-3 py-1.5 rounded-md
                  transition-all duration-200 ease-in-out 
                  ${
                    isActive
                      ? "bg-gray-100 dark:bg-blue-950/30 text-gray-900 dark:text-white"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-neutral-800/50"
                  }
                `}
              >
                <Icon
                  className={`text-base transition-transform duration-200 ${
                    isActive ? "scale-105" : "group-hover:scale-105"
                  }`}
                />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Mobile Navigation - Dropdown */}
        <div className="lg:hidden flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors">
                <span className="text-xs font-medium">
                  {navItems.find((item) => item.id === view)?.label || "Menu"}
                </span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 z-[9999]">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = view === item.id;
                return (
                  <DropdownMenuItem
                    key={item.id}
                    onClick={() => toggleView(item.id as HeaderSelect)}
                    className={`flex items-center gap-2 cursor-pointer ${
                      isActive
                        ? "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400"
                        : ""
                    }`}
                  >
                    <Icon className="text-lg" />
                    <span>{item.label}</span>
                    {isActive && (
                      <div className="ml-auto w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400" />
                    )}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Theme Toggle */}
          <div className="hidden sm:flex">
            <ModeToggle />
          </div>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 px-2.5 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors duration-200 group">
                <div className="flex items-center gap-2">
                  {loggedUser.image ? (
                    <Image
                      src={loggedUser.image}
                      alt="Profile"
                      width={28}
                      height={28}
                      className="rounded-full border border-gray-200 dark:border-gray-700 shadow-sm transition-transform duration-200 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-[10px] font-semibold shadow-sm">
                      {(loggedUser.username || loggedUser.role || "U")
                        .charAt(0)
                        .toUpperCase()}
                    </div>
                  )}
                  <div className="hidden md:flex flex-col items-start leading-tight">
                    <span className="text-xs font-semibold text-gray-900 dark:text-gray-100">
                      {loggedUser.username || "User"}
                    </span>
                    <span className="text-[10px] text-gray-500 dark:text-gray-400">
                      {loggedUser.role || "Member"}
                    </span>
                  </div>
                </div>
                <svg
                  className="w-3.5 h-3.5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 z-[9999] bg-white rounded"
            >
              <div className="px-2 py-1.5 border-b border-gray-200 dark:border-gray-700">
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {loggedUser.username || "User"}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {loggedUser.email || "No email"}
                </p>
              </div>
              <DropdownMenuItem
                onClick={() => setIsProfileSettingsOpen(true)}
                className="flex items-center gap-2 cursor-pointer"
              >
                <CiSettings className="text-lg" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="flex items-center gap-2 cursor-pointer text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400"
              >
                <IoLogOutOutline className="text-lg" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
