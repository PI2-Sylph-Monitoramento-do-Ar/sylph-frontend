import React from "react";
import { ILocalStorageService } from "_/services/LocalStorageService";
import { ASYNC_STORAGE } from "_/constants/asyncStorage";
import { usePersistentState } from "_/hooks/usePersistentState";

interface GuestContextProps {
  children: JSX.Element;
  localStorage: ILocalStorageService;
}

interface GuestContextParams {
  isGuest?: boolean;
  isCheckingGuest: boolean;
  guestLogin: () => Promise<void>;
  signOut: () => Promise<void>;
}

const GuestContext = React.createContext<GuestContextParams>(
  {} as GuestContextParams
);

const GuestContextProvider = ({
  children,
  localStorage,
}: GuestContextProps) => {
  const { setPersistentState, value, isCheckingState } =
    usePersistentState<boolean>(ASYNC_STORAGE.GUEST_USER, localStorage);

  const guestLogin = async () => {
    await setPersistentState(true);
  };

  const signOut = async () => {
    await setPersistentState(false);
  };

  return (
    <GuestContext.Provider
      value={{
        guestLogin,
        isGuest: value,
        isCheckingGuest: isCheckingState,
        signOut,
      }}
    >
      {children}
    </GuestContext.Provider>
  );
};

export { GuestContext, GuestContextProvider };
