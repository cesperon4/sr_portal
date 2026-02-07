"use client";

import { LogoMark } from "@/components/logo-mark";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUserContext } from "@/context/UserContext";
import { HeaderSelect } from "@/types/header.interface";
import {
  BarChart3,
  LogOut,
  MapPin,
  ScrollText,
  Settings,
  User,
  Users,
} from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
    { id: "Profile", icon: User, label: "Profile" },
    { id: "Map", icon: MapPin, label: "Map" },
    { id: "Table", icon: ScrollText, label: "Logs" },
    { id: "Chart", icon: BarChart3, label: "Insights" },
    { id: "Community", icon: Users, label: "Community" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-neutral-950 border-b border-gray-100/80 dark:border-neutral-800/80 shadow-[0_1px_0_0_rgba(0,0,0,0.02)] dark:shadow-none">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <div className="flex min-w-0 flex-shrink-0 items-center gap-3">
          <LogoMark size={36} showLabel={false} className="shrink-0" />
          <div className="flex flex-col justify-center leading-tight">
            <span className="text-body-sm font-semibold text-gray-900 dark:text-white truncate">
              SR Portal
            </span>
            <span className="text-caption uppercase tracking-wider">
              Dashboard
            </span>
          </div>
        </div>

        {/* Weather — my-2 creates gap between pill and header top/bottom */}
        <div className="hidden md:flex flex-shrink-0 items-center self-center my-2">
          <WeatherWrapper />
        </div>

        {/* Nav */}
        <nav className="hidden lg:flex flex-1 items-center justify-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = view === item.id;
            return (
              <button
                key={item.id}
                onClick={() => toggleView(item.id as HeaderSelect)}
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
                  className="size-[1.125rem] shrink-0 stroke-[1.5]"
                  strokeWidth={1.5}
                  aria-hidden
                />
                <span>{item.label}</span>
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

        {/* Mobile nav */}
        <div className="flex lg:hidden shrink-0 items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="flex items-center gap-2 rounded-lg border border-gray-200 dark:border-neutral-700 bg-gray-50/80 dark:bg-neutral-800/50 px-3 py-2 text-body-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors"
                aria-label="Open menu"
              >
                {navItems.find((item) => item.id === view)?.label ?? "Menu"}
                <svg
                  className="size-4 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
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
              className="w-52 rounded-xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-1 shadow-lg z-[9999]"
            >
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = view === item.id;
                return (
                  <DropdownMenuItem
                    key={item.id}
                    onClick={() => toggleView(item.id as HeaderSelect)}
                    className={`flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium tracking-tight ${
                      isActive
                        ? "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    <Icon
                      className="size-[1.125rem] shrink-0 stroke-[1.5]"
                      strokeWidth={1.5}
                      aria-hidden
                    />
                    <span>{item.label}</span>
                    {isActive && (
                      <span
                        className="ml-auto size-1.5 rounded-full bg-blue-500 dark:bg-blue-400"
                        aria-hidden
                      />
                    )}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Right: theme + user */}
        <div className="flex shrink-0 items-center gap-2">
          <div className="hidden sm:block">
            <ModeToggle />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 hover:bg-gray-50 dark:hover:bg-neutral-800/50 transition-colors group outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:focus-visible:ring-blue-400"
                aria-label="Account menu"
              >
                {loggedUser.image ? (
                  <Image
                    src={loggedUser.image}
                    alt=""
                    width={32}
                    height={32}
                    className="size-8 shrink-0 rounded-full border border-gray-200 dark:border-neutral-700 object-cover"
                  />
                ) : (
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-xs font-semibold text-white">
                    {(loggedUser.username || loggedUser.role || "U")
                      .charAt(0)
                      .toUpperCase()}
                  </div>
                )}
                <div className="hidden md:flex flex-col items-start text-left">
                  <span className="text-body-sm font-semibold text-gray-900 dark:text-white leading-tight truncate max-w-[120px]">
                    {loggedUser.username || "User"}
                  </span>
                  <span className="text-caption leading-tight">
                    {loggedUser.role || "Member"}
                  </span>
                </div>
                <svg
                  className="size-4 shrink-0 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden
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
              className="w-64 rounded-xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-0 shadow-lg z-[9999] overflow-hidden"
            >
              <div className="border-b border-gray-100 dark:border-neutral-800 px-4 py-3">
                <p className="text-body-sm font-semibold text-gray-900 dark:text-white truncate">
                  {loggedUser.username || "User"}
                </p>
                <p className="text-caption truncate mt-0.5">
                  {loggedUser.email || "No email"}
                </p>
              </div>
              <div className="p-1">
                <DropdownMenuItem
                  onClick={() => setIsProfileSettingsOpen(true)}
                  className="flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium tracking-tight text-gray-700 dark:text-gray-300 focus:bg-gray-50 dark:focus:bg-neutral-800 focus:text-gray-900 dark:focus:text-white"
                >
                  <Settings
                    className="size-[1.125rem] shrink-0 stroke-[1.5]"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="my-1" />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium tracking-tight text-red-600 dark:text-red-400 focus:bg-red-50 dark:focus:bg-red-950/30 focus:text-red-600 dark:focus:text-red-400"
                >
                  <LogOut
                    className="size-[1.125rem] shrink-0 stroke-[1.5]"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                  <span>Logout</span>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
