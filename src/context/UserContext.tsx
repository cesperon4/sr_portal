"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useSession } from "next-auth/react";

interface User {
  id: string;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  role: string;
  token: string;
  image?: string;
}

interface UserContextType {
  loggedUser: User;
  setLoggedUser: React.Dispatch<React.SetStateAction<User>>;
  clearLoggedUser: () => void;
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
  const { data: session } = useSession();

  const [loggedUser, setLoggedUser] = useState<User>({
    id: "",
    username: "",
    email: "",
    firstname: "",
    lastname: "",
    role: "",
    token: "",
    image: "",
  });

  // 👇 Auto-sync when session changes
  useEffect(() => {
    if (session?.user) {
      setLoggedUser({
        id: session.user.id ?? "",
        username: session.user.username ?? "",
        email: session.user.email ?? "",
        firstname: session.user.firstname ?? "",
        lastname: session.user.lastname ?? "",
        role: session.user.role ?? "",
        token: session.user.backendToken ?? "",
        image: session.user.image ?? "",
      });
    } else {
      // Reset when logged out
      setLoggedUser({
        id: "",
        username: "",
        email: "",
        firstname: "",
        lastname: "",
        role: "",
        token: "",
        image: "",
      });
    }
  }, [session]);

  const clearLoggedUser = () => {
    setLoggedUser({
      id: "",
      username: "",
      email: "",
      firstname: "",
      lastname: "",
      role: "",
      token: "",
      image: "",
    });
  };

  return (
    <UserContext.Provider
      value={{ loggedUser, setLoggedUser, clearLoggedUser }}
    >
      {children}
    </UserContext.Provider>
  );
};
