import React from "react";
import { useAuthHeader, useIsAuthenticated, useSignOut } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import { AppUser } from "./types";
import { getAppUser, handleTokenExpiration, isTokenExpired } from "./api";

interface UserContextProps {
  user: AppUser | null;
  setUser: React.Dispatch<React.SetStateAction<AppUser | null>>;
  updateUser: (updatedUser: AppUser) => void;
  updateUserAttribute: (updatedAttributes: Partial<AppUser>) => void;
  hasFetchedUser: boolean;
}

const initialUser: AppUser | null = null; //Idea from ChatGPT 3.5

const UserContext = React.createContext<UserContextProps | undefined>(
  undefined
);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<AppUser | null>(initialUser);
  const [hasFetchedUser, setHasFetchedUser] = React.useState<boolean>(false); //Idea from ChatGPT 3.5

  const auth = useAuthHeader();
  const signOut = useSignOut();
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();

  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(() => {
    if (isAuthenticated() && !hasFetchedUser) {
      if (isTokenExpired(auth())) {
        handleTokenExpiration(signOut, navigate);
      } else {
        getUserData();
      }
    } else if (!isAuthenticated()) {
      setUser(null);
      setHasFetchedUser(false);
    }
  }, [hasFetchedUser, isAuthenticated]);

  const getUserData = async () => {
    const response = await getAppUser(auth());
    const userData = response.data;
    setUser(userData);
    setHasFetchedUser(true);
  };

  const updateUser = React.useCallback((updatedUser: AppUser) => {
    setUser(updatedUser);
    setHasFetchedUser(true);
  }, []);

  const updateUserAttribute = React.useCallback(
    //Structure from ChatGPT 3.5
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
  //Structure from ChatGPT 3.5
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
