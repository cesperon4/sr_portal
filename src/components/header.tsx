"use client";
import { useUserContext } from "@/context/UserContext";
import { HeaderSelect } from "@/types/header.interface";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CiSettings } from "react-icons/ci";
import { FaPeopleGroup } from "react-icons/fa6";
import { IoMdBook } from "react-icons/io";
import { IoMapOutline } from "react-icons/io5";
import { MdInsights, MdOutlineAddBox } from "react-icons/md";
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
    <header className="dashboard-header font-medium mb-4 h-2/12">
      <div className="header-main">
        <Image
          aria-hidden
          src="/logo4.png"
          alt="Illustration"
          width={50}
          height={50}
          className="relative z-10 animate-fadeIn rounded-xl"
        />
        <span className="font-semibold">SR Portal</span>
        <ModeToggle />
        <div className="flex gap-4">
          <UnderlineButton
            clickMethod={() => {
              toggleView("Map");
            }}
            view="Map"
            currentView={view}
          >
            <IoMapOutline />
            Map
          </UnderlineButton>

          <UnderlineButton
            clickMethod={() => {
              toggleView("Table");
            }}
            view="Table"
            currentView={view}
          >
            <IoMdBook />
            Data Logs
          </UnderlineButton>

          <UnderlineButton
            clickMethod={() => {
              toggleView("Chart");
            }}
            view="Chart"
            currentView={view}
          >
            <MdInsights />
            Data Insights
          </UnderlineButton>

          <UnderlineButton
            clickMethod={() => {
              toggleView("Community");
            }}
            view="Community"
            currentView={view}
          >
            <FaPeopleGroup />
            Community
          </UnderlineButton>
        </div>
        {/* {view === "Table" && (
          <div className={`flex gap-2 items-center ml-auto`}>
            <Button
              variant="outline"
              onClick={() => {
                openSelectColumns();
              }}
              className="rounded border-1 border-gray-400 hover:bg-gray-50"
            >
              Select Columns
            </Button>
            <Searchbar />
          </div>
        )} */}

        <div className="flex gap-2 items-center ml-auto">
          {view === "Community" && (
            <button
              className="flex items-center gap-2 hover:bg-gray-100 rounded-xl p-2 cursor-pointer ml-auto"
              onClick={() => {
                router.push("/community/submit");
              }}
            >
              <MdOutlineAddBox size={24} />

              <span>create</span>
            </button>
          )}
          <WeatherWrapper />

          <span className="font-medium">
            {loggedUser.username ? loggedUser.username : loggedUser.role}
          </span>

          {/* <span>{loggedUser.image}</span> */}
          {loggedUser.image && (
            <Image
              aria-hidden
              src={loggedUser.image}
              alt="Window icon"
              width={40}
              height={40}
              className="rounded-3xl"
            />
          )}
          <CiSettings
            size="28"
            className="hover:bg-text-100 cursor-pointer"
            onClick={() => {
              setIsProfileSettingsOpen(true);
            }}
          />
        </div>

        <div className="logout-wrapper">
          <UnderlineButton clickMethod={handleLogout}>Logout</UnderlineButton>
        </div>
      </div>
    </header>
  );
}
