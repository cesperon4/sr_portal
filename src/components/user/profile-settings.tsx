"use client";

import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/UserContext";
import { useProfileSettings } from "@/hooks/user/useProfileSettings";
import { AlertCircle, Lock, Mail, User, UserCircle, X } from "lucide-react";
import React from "react";
import { FcBiomass } from "react-icons/fc";
import { Backdrop } from "../backdrop";

interface ProfileSettingsProps {
  setIsProfileSettingsOpen: (arg: boolean) => void;
}

export function ProfileSettings({
  setIsProfileSettingsOpen,
}: ProfileSettingsProps) {
  const { loggedUser } = useUserContext();

  const { updateUserProps, handleUpdateUserProps, updateUser } =
    useProfileSettings();

  const isGuest = loggedUser.role === "GUEST";

  // Handle escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsProfileSettingsOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [setIsProfileSettingsOpen]);

  return (
    <Backdrop
      onClick={() => {
        setIsProfileSettingsOpen(false);
      }}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col m-4"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-100 rounded-lg">
              <UserCircle className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Profile Settings
              </h2>
              <p className="text-sm text-gray-500">
                Update your personal information
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsProfileSettingsOpen(false)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-700"
            aria-label="Close settings"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 px-6 py-6">
          {/* Guest Warning */}
          {isGuest && (
            <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-amber-900">
                  Guest Account
                </p>
                <p className="text-sm text-amber-700 mt-1">
                  Profile editing is disabled for guest accounts. Please sign up
                  to update your information.
                </p>
              </div>
            </div>
          )}

          <form className="space-y-5">
            {/* First Name */}
            <div className="space-y-1.5">
              <label
                htmlFor="firstname"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  placeholder="Enter your first name"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors"
                  disabled={isGuest}
                  defaultValue={updateUserProps.firstname || ""}
                  onChange={handleUpdateUserProps}
                />
              </div>
            </div>

            {/* Last Name */}
            <div className="space-y-1.5">
              <label
                htmlFor="lastname"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  placeholder="Enter your last name"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors"
                  disabled={isGuest}
                  defaultValue={updateUserProps.lastname || ""}
                  onChange={handleUpdateUserProps}
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors"
                  disabled={isGuest}
                  defaultValue={updateUserProps.email || ""}
                  onChange={handleUpdateUserProps}
                />
              </div>
            </div>

            {/* Username */}
            <div className="space-y-1.5">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <div className="relative">
                <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Enter your username"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors"
                  disabled={isGuest}
                  defaultValue={updateUserProps.username || ""}
                  onChange={handleUpdateUserProps}
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter new password"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors"
                  disabled={isGuest}
                  defaultValue={updateUserProps.password || ""}
                  onChange={handleUpdateUserProps}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Leave blank to keep your current password
              </p>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="tier"
                className="block text-sm font-medium text-gray-700"
              >
                Account Type
              </label>
              <div className="flex justify-between">
                <div className="relative flex items-center gap-1">
                  <FcBiomass />
                  <p>Free</p>
                </div>

                <button className="bg-blue-400 p-2 rounded text-white hover:bg-blue-200">
                  Upgrade Account
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl flex-shrink-0 flex gap-3">
          <Button
            variant="outline"
            onClick={() => setIsProfileSettingsOpen(false)}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            disabled={isGuest}
            onClick={() => {
              updateUser();
            }}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Save Changes
          </Button>
        </div>
      </div>
    </Backdrop>
  );
}
