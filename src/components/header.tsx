"use client";
import React from "react";
import { ModeToggle } from "../components/mode-toggle";
import { Button } from "@/components/ui/button";
import { HeaderSelect } from "@/types/header.interface";
import Searchbar from "@/components/data-table/searchbar";

import { MdInsights } from "react-icons/md";
import { IoMdBook } from "react-icons/io";
import { IoMapOutline } from "react-icons/io5";
import { CiSettings } from "react-icons/ci";
import { FaPeopleGroup } from "react-icons/fa6";

import { useLogoutMutation } from "../../generated/graphql";

import { useUserContext } from "@/context/UserContext";

import { HEADER_CLASSES } from "@/lib/constants";
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
  const router = useRouter();

  const { loggedUser } = useUserContext();
  const [logoutMutation] = useLogoutMutation();
  return (
    <header className="flex gap-4 items-center mr-auto w-full border-b-2 pb-4">
      <span className="font-semibold">SR PORTAL</span>
      <ModeToggle />
      <div className="flex gap-1">
        <Button
          variant="outline"
          onClick={() => {
            toggleView("Map");
          }}
          className={`${view === "Map" && HEADER_CLASSES.view_button}`}
        >
          Map
          <IoMapOutline />
        </Button>

        <Button
          variant="outline"
          onClick={() => {
            toggleView("Table");
          }}
          className={`${view === "Table" && HEADER_CLASSES.view_button}`}
        >
          Arrest Log
          <IoMdBook />
        </Button>

        <Button
          variant="outline"
          onClick={() => {
            toggleView("Chart");
          }}
          className={`${view === "Chart" && HEADER_CLASSES.view_button}`}
        >
          Data Insights
          <MdInsights />
        </Button>

        <Button
          variant="outline"
          onClick={() => {
            toggleView("Community");
          }}
          className={`${view === "Community" && HEADER_CLASSES.view_button}`}
        >
          Community
          <FaPeopleGroup />
        </Button>
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

      <div className="flex gap-2 items-center ">
        <span className="font-medium">
          {loggedUser.username ? loggedUser.username : loggedUser.role}
        </span>
        <CiSettings
          size="28"
          className="hover:bg-text-100 cursor-pointer"
          onClick={() => {
            setIsProfileSettingsOpen(true);
          }}
        />
      </div>

      <Button
        variant="outline"
        className="ml-auto border-2 bg-red-400 text-white"
        onClick={async () => {
          await logoutMutation();
          router.push("/");
        }}
      >
        Logout
      </Button>
    </header>
  );
}
