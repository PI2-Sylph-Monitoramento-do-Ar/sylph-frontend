import { useContext } from "react";
import { LocationContext } from "_/contexts/LocationContext";

export const useLocation = () => useContext(LocationContext);
