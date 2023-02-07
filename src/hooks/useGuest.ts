import { useContext } from "react";
import { GuestContext } from "_/contexts/GuestContext";

export const useGuest = () => useContext(GuestContext);
