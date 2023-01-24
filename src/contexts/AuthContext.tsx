import React, { useState } from "react";
import * as Google from "expo-auth-session/providers/google";
import { firebaseAuthInstance } from "_/config/firebaseConfig";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { CLIENT_ID } from "_/constants/secrets";

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
  const [userCredentials, setUserCredentials] = useState({});
  const [isGuest, setIsGuest] = useState(false);

  const [_1, _2, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: CLIENT_ID,
  });

  const guestLogin = async () => {
    setIsGuest(true);
    setIsLoading(false);
  };

  const adminLogin = async () => {
    await validateUserOnGoogle();
    setIsAuthed(true);
    setIsLoading(false);
  };

  const validateUserOnGoogle = async () => {
    try {
      const response = await promptAsync();
      if (response?.type === "success") {
        const { id_token } = response.params;

        const idToken = id_token;
        const credential = GoogleAuthProvider.credential(idToken);
        const googleUserCredentials = await signInWithCredential(
          firebaseAuthInstance,
          credential
        );
        setUserCredentials(googleUserCredentials);
      }
    } catch (e) {
      console.error(e);
    }
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
