"use client";

import React from "react";
import { Backdrop } from "../backdrop";
import { Button } from "@mui/material";
import { useUserContext } from "@/context/UserContext";

import { useProfileSettings } from "@/hooks/user/useProfileSettings";
interface ProfileSettingsProps {
  setIsProfileSettingsOpen: (arg: boolean) => void;
}
export function ProfileSettings({
  setIsProfileSettingsOpen,
}: ProfileSettingsProps) {
  const { loggedUser } = useUserContext();

  const { updateUserProps, handleUpdateUserProps, updateUser } =
    useProfileSettings();

  return (
    <Backdrop
      onClick={() => {
        setIsProfileSettingsOpen(false);
      }}
    >
      <form
        className="flex flex-col gap-2 bg-white p-12 rounded shadow-sm w-4/12"
        // onSubmit={updateUser}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <h2>User Information</h2>

        <input
          type="text"
          id="firstname"
          name="firstname"
          placeholder={"First Name"}
          className="border rounded p-2 w-full"
          disabled={loggedUser.role === "GUEST"}
          defaultValue={updateUserProps.firstname || ""}
          onChange={(e) => {
            handleUpdateUserProps(e);
          }}
        />
        <input
          type="text"
          id="lastname"
          name="lastname"
          placeholder={"Last Name"}
          className="border rounded p-2 w-full"
          disabled={loggedUser.role === "GUEST"}
          defaultValue={updateUserProps.lastname || ""}
          onChange={(e) => {
            handleUpdateUserProps(e);
          }}
        />
        <input
          type="text"
          id="email"
          name="email"
          placeholder={"Email"}
          className="border rounded p-2 w-full"
          disabled={loggedUser.role === "GUEST"}
          defaultValue={updateUserProps.email || ""}
          onChange={(e) => {
            handleUpdateUserProps(e);
          }}
        />
        <input
          type="text"
          id="username"
          name="username"
          placeholder={"Username"}
          className="border rounded p-2 w-full"
          disabled={loggedUser.role === "GUEST"}
          defaultValue={updateUserProps.username || ""}
          onChange={(e) => {
            handleUpdateUserProps(e);
          }}
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder={"Password"}
          className="border rounded p-2 w-full"
          disabled={loggedUser.role === "GUEST"}
          defaultValue={updateUserProps.password || ""}
          onChange={(e) => {
            handleUpdateUserProps(e);
          }}
        />

        <Button
          variant="contained"
          disabled={loggedUser.role === "GUEST"}
          onClick={() => {
            updateUser();
          }}
        >
          Update
        </Button>
      </form>
    </Backdrop>
  );
}
