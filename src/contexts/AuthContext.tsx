import React, { useState } from "react";

interface AuthContextProps {
  children: JSX.Element;
}

interface AuthContextParams {
  isLoading: boolean;
  isAuthed: boolean;
  isGuest: boolean;
  adminLogin: () => Promise<void>;
  guestLogin: () => void;
}

const AuthContext = React.createContext<AuthContextParams>(
  {} as AuthContextParams
);

const AuthContextProvider = ({ children }: AuthContextProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthed, setIsAuthed] = useState(false);
  const [isGuest, setIsGuest] = useState(false);

  const adminLogin = async () => {
    const getAuthUser = async () => Promise.resolve(true);
    setIsAuthed(await getAuthUser());
    setIsLoading(false);
  };

  const guestLogin = async () => {
    setIsGuest(true);
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{ adminLogin, guestLogin, isLoading, isGuest, isAuthed }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
