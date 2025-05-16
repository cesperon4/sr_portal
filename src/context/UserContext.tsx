"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface User {
  id: string;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  role: string;
  token: string;
}

interface UserContextType {
  loggedUser: User;
  setLoggedUser: React.Dispatch<React.SetStateAction<User>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [loggedUser, setLoggedUser] = useState<User>({
    id: "",
    username: "",
    email: "",
    firstname: "",
    lastname: "",
    role: "",
    token: "",
  });

  return (
    <UserContext.Provider value={{ loggedUser, setLoggedUser }}>
      {children}
    </UserContext.Provider>
  );
};
