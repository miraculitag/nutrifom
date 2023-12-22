import React, { createContext, useState, useContext, useCallback } from "react";
import { AppUser } from "./types";

interface UserContextProps {
  user: AppUser | null;
  setUser: React.Dispatch<React.SetStateAction<AppUser | null>>;
  updateUser: (updatedUser: AppUser) => void;
  updateUserAttribute: (updatedAttributes: Partial<AppUser>) => void;
}

const initialUser: AppUser | null = null;

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AppUser | null>(initialUser);

  const updateUser = useCallback((updatedUser: AppUser) => {
    setUser(updatedUser);
  }, []);

  const updateUserAttribute = useCallback(
    (updatedAttributes: Partial<AppUser>) => {
      if (user) {
        setUser({ ...user, ...updatedAttributes });
      }
    },
    [user]
  );

  return (
    <UserContext.Provider
      value={{ user, setUser, updateUser, updateUserAttribute }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
