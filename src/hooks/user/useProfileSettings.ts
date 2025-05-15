import { useState } from "react";

import { useUserContext } from "@/context/UserContext";
import { useUpdateUserMutation } from "../../../generated/graphql";

interface updateUserPropsType {
  id: string;
  firstname: string | null;
  lastname: string | null;
  email: string | null;
  username: string | null;
  password: string | null;
}
export function useProfileSettings() {
  const { loggedUser, setLoggedUser } = useUserContext();
  const [updateUserMutation] = useUpdateUserMutation();

  const initialUserProps: updateUserPropsType = {
    id: loggedUser?.id,
    firstname: loggedUser?.firstname,
    lastname: loggedUser?.lastname,
    email: loggedUser?.email,
    username: loggedUser?.username,
    password: loggedUser?.username,
  };

  const [updateUserProps, setUpdateUserProps] =
    useState<updateUserPropsType>(initialUserProps);

  const handleUpdateUserProps = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateUserProps((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const [isProfileSettingsOpen, setIsProfileSettingsOpen] =
    useState<boolean>(false);

  const updateUser = async () => {
    if (!updateUserProps.id) return;

    // Build only changed fields
    const changedFields: Record<string, string> = {};

    Object.keys(updateUserProps).forEach((key) => {
      const typedKey = key as keyof updateUserPropsType;
      if (
        updateUserProps[typedKey] !== initialUserProps[typedKey] &&
        updateUserProps[typedKey] !== null
      ) {
        changedFields[typedKey] = updateUserProps[typedKey]!;
      }
    });
    if (Object.keys(changedFields).length === 0) {
      console.log("No fields changed. Skipping update.");
      return;
    }

    try {
      await updateUserMutation({
        variables: {
          id: updateUserProps.id,
          data: changedFields,
        },
        onCompleted: (data) => {
          console.log("Update successful:", data);
          Object.keys(changedFields).forEach((key) => {
            setLoggedUser((prev) => ({
              ...prev,
              [key]: changedFields[key as keyof typeof changedFields],
            }));
          });
        },
        onError: (error) => {
          console.error("Update user error:", error);
        },
      });
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  return {
    isProfileSettingsOpen,
    setIsProfileSettingsOpen,
    updateUserProps,
    setUpdateUserProps,
    handleUpdateUserProps,
    updateUser,
  };
}
