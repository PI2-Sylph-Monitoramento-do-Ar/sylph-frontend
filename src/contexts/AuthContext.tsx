import React, { useState } from "react";
import { firebaseAuthInstance } from "_/config/firebaseConfig";
import { signInWithCredential, getAuth, OAuthCredential } from "firebase/auth";

interface AuthContextProps {
  children: JSX.Element;
}

interface AuthContextParams {
  isLoading: boolean;
  isAuthed: boolean;
  isGuest: boolean;
  adminLogin: (credential: OAuthCredential) => Promise<void>;
  guestLogin: () => void;
  adminToken: string,
}

const AuthContext = React.createContext<AuthContextParams>(
  {} as AuthContextParams
);

const AuthContextProvider = ({ children }: AuthContextProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthed, setIsAuthed] = useState(false);
  const [userCredentials, setUserCredentials] = useState({});
  const [isGuest, setIsGuest] = useState(false);
  const [adminToken, setAdminToken] = useState('');

  const guestLogin = async () => {
    setIsGuest(true);
    setIsLoading(false);
  };

  const adminLogin = async (credential: OAuthCredential) => {
    await validateUserOnGoogle(credential);
    setIsLoading(false);
  };

  const validateUserOnGoogle = async (credential?: OAuthCredential) => {
    try {
      if (credential) {
        const googleUserCredentials = await signInWithCredential(
          firebaseAuthInstance,
          credential
        );

        const auth = getAuth();
        const user = auth.currentUser;
        const token = await user?.getIdToken();

        setIsAuthed(true);
        setUserCredentials(googleUserCredentials);
        if (token) setAdminToken(token);

      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AuthContext.Provider
      value={{ adminLogin, guestLogin, isLoading, isGuest, isAuthed, adminToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };