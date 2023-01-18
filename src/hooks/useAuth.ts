import { useContext } from "react";
import { AuthContext } from "_/contexts/AuthContext";

export const useAuth = () => useContext(AuthContext);
