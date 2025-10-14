"use client";
import React from "react";
import { ModeToggle } from "../components/mode-toggle";
import { Button } from "@/components/ui/button";
import { HeaderSelect } from "@/types/header.interface";
import Searchbar from "@/components/data-table/searchbar";
import UnderlineButton from "./ui/underline-button";

import { MdInsights } from "react-icons/md";
import { IoMdBook } from "react-icons/io";
import { IoMapOutline } from "react-icons/io5";
import { CiSettings } from "react-icons/ci";
import { FaPeopleGroup } from "react-icons/fa6";
import { MdOutlineAddBox } from "react-icons/md";

import { useLogoutMutation } from "../../generated/graphql";

import { useUserContext } from "@/context/UserContext";

import { signOut } from "next-auth/react";

import Image from "next/image";

import { useRouter } from "next/navigation";

interface HeaderProps {
  view: HeaderSelect;
  toggleView: (view: HeaderSelect) => void;
  searchArrestLogs: (e: string, filter: string) => void;
  openSelectColumns: () => void;
  setIsProfileSettingsOpen: (arg: boolean) => void;
}
export function Header({
  view,
  toggleView,
  searchArrestLogs,
  openSelectColumns,
  setIsProfileSettingsOpen,
}: HeaderProps) {
  const { loggedUser, clearLoggedUser } = useUserContext();
  const [logoutMutation] = useLogoutMutation();
  const router = useRouter();
  return (
    <header className="dashboard-header font-medium mb-4">
      <div className="header-main">
        <span className="font-semibold">SR PORTAL</span>
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
            Arrest Log
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
        {view === "Table" && (
          <div className={`flex gap-2 items-center ml-12`}>
            <Button
              variant="outline"
              onClick={() => {
                openSelectColumns();
              }}
            >
              Select Columns
            </Button>
            <Searchbar handleChange={searchArrestLogs} />
          </div>
        )}

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
          <UnderlineButton
            clickMethod={async () => {
              await logoutMutation();
              signOut({ callbackUrl: "/" });
              clearLoggedUser();
            }}
          >
            Logout
          </UnderlineButton>
        </div>
      </div>
    </header>
  );
}
