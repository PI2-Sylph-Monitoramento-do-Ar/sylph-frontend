import React, { useEffect, useState } from "react";
import { firebaseAuthInstance } from "_/config/firebaseConfig";
import { signInWithCredential, getAuth, OAuthCredential } from "firebase/auth";
import { ILocalStorageService } from "_/services/LocalStorageService";
import { ASYNC_STORAGE } from "_/constants/asyncStorage";
import { usePersistentState } from "_/hooks/usePersistentState";
import { AuthCredentials, IAuthService } from "_/services/AuthService";
import { ServerError } from "_/adapters/https/error";

interface AuthContextProps {
  children: JSX.Element;
  localStorage: ILocalStorageService;
  authService: IAuthService
}


interface AuthContextParams {
  isAuthed?: boolean;
  isCheckingAuth: boolean;
  signIn: (credential: AuthCredentials) => Promise<void>;
  signOut: () => void;
  adminUser?: AdminUser
  error?: Error
}

const AuthContext = React.createContext<AuthContextParams>(
  {} as AuthContextParams
);

const AuthContextProvider = ({ children, authService }: AuthContextProps) => {

  const [isCheckingAuth, setIsChekingAuth] = useState(true);
  const [adminUser, setAdminUser] = useState<AdminUser>(); 
  const [error, setError] = useState<Error>()
  
  useEffect(() => {
    authService.checkAuthenticated().then((user) => {
      console.log()
      setAdminUser(user)
      setIsChekingAuth(false)
    }
    )
  }, [])

  const signIn = async (credentials: AuthCredentials) => {
    try {
      const adminUser = await authService.signIn(credentials)
      console.log(adminUser)
      setAdminUser(adminUser)
    } catch(error){
      console.error(error)
      if(error instanceof Error) setError(error)
      setError(new ServerError())
    }
  }

  const signOut = () => {
    authService.logout()
    setAdminUser(undefined)
  };

  return (
    <AuthContext.Provider
      value={{
        adminUser,
        signIn,
        isCheckingAuth,
        isAuthed: !!adminUser,
        signOut,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
