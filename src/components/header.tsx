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

import { signOut } from "next-auth/react";

import Image from "next/image";

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
  return (
    <header className="dashboard-header">
      <span className="font-semibold">SR PORTAL</span>
      <ModeToggle />
      <div className="flex gap-1">
        <Button
          variant="outline"
          onClick={() => {
            toggleView("Map");
          }}
          className={`map-btn ${view === "Map" && HEADER_CLASSES.view_button}`}
        >
          Map
          <IoMapOutline />
        </Button>

        <Button
          variant="outline"
          onClick={() => {
            toggleView("Table");
          }}
          className={`header-toggle ${
            view === "Table" && HEADER_CLASSES.view_button
          }`}
        >
          Arrest Log
          <IoMdBook />
        </Button>

        <Button
          variant="outline"
          onClick={() => {
            toggleView("Chart");
          }}
          className={`header-toggle ${
            view === "Chart" && HEADER_CLASSES.view_button
          }`}
        >
          Data Insights
          <MdInsights />
        </Button>

        <Button
          variant="outline"
          onClick={() => {
            toggleView("Community");
          }}
          className={`header-toggle ${
            view === "Community" && HEADER_CLASSES.view_button
          }`}
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

      <Button
        variant="outline"
        className="logout-btn"
        onClick={async () => {
          await logoutMutation();
          signOut({ callbackUrl: "/" });
          clearLoggedUser();
        }}
      >
        Logout
      </Button>
    </header>
  );
}
