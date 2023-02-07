import React, { useState } from "react";
import { firebaseAuthInstance } from "_/config/firebaseConfig";
import { signInWithCredential, getAuth, OAuthCredential } from "firebase/auth";
import { ILocalStorageService } from "_/services/LocalStorageService";
import { ASYNC_STORAGE } from "_/constants/asyncStorage";
import { usePersistentState } from "_/hooks/usePersistentState";

interface AuthContextProps {
  children: JSX.Element;
  localStorage: ILocalStorageService;
}

interface AuthContextParams {
  isAuthed?: string;
  isCheckingAuth: boolean;
  adminLogin: (credential: OAuthCredential) => Promise<void>;
  signOut: () => void;
  adminToken: string;
}

const AuthContext = React.createContext<AuthContextParams>(
  {} as AuthContextParams
);

const AuthContextProvider = ({ children, localStorage }: AuthContextProps) => {
  const [adminToken, setAdminToken] = useState("");

  const { setPersistentState, value, isCheckingState } = usePersistentState(
    ASYNC_STORAGE.AUTH_USER,
    localStorage
  );

  const adminLogin = async (credential: OAuthCredential) => {
    await validateUserOnGoogle(credential);
  };

  const validateUserOnGoogle = async (credential?: OAuthCredential) => {
    try {
      if (credential) {
        await signInWithCredential(firebaseAuthInstance, credential);

        const auth = getAuth();
        const user = auth.currentUser;
        const token = await user?.getIdToken();
        if (token) setAdminToken(token);
        setPersistentState(true);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const signOut = () => {
    setPersistentState(false);
  };

  return (
    <AuthContext.Provider
      value={{
        adminLogin,
        isCheckingAuth: isCheckingState,
        isAuthed: value as string | undefined,
        adminToken,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
