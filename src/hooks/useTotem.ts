import { useContext } from "react";
import { TotemContext } from "_/contexts/TotemContext";

export const useTotem = () => useContext(TotemContext);
