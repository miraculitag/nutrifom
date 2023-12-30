import React, { createContext, useState, useContext, useCallback } from "react";
import { AppUser } from "./types";
import { getAppUser } from "./api";
import { useAuthHeader, useIsAuthenticated } from "react-auth-kit";

interface UserContextProps {
  user: AppUser | null;
  setUser: React.Dispatch<React.SetStateAction<AppUser | null>>;
  updateUser: (updatedUser: AppUser) => void;
  updateUserAttribute: (updatedAttributes: Partial<AppUser>) => void;
  hasFetchedUser: boolean;
}

const initialUser: AppUser | null = null;

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AppUser | null>(initialUser);
  const [hasFetchedUser, setHasFetchedUser] = useState(false);
  const auth = useAuthHeader();
  const isAuthenticated = useIsAuthenticated();

  const getUserData = async () => {
    const response = await getAppUser(auth());
    const userData = response.data;
    setUser(userData);
    setHasFetchedUser(true);
    console.log(userData);
  };

  React.useEffect(() => {
    if (isAuthenticated() && !hasFetchedUser) {
      getUserData();
    } else if (!isAuthenticated()) {
      setUser(null);
      setHasFetchedUser(false);
    }
  }, [hasFetchedUser, isAuthenticated()]);

  const updateUser = useCallback((updatedUser: AppUser) => {
    setUser(updatedUser);
    setHasFetchedUser(true);
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
      value={{ user, setUser, updateUser, updateUserAttribute, hasFetchedUser }}
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
