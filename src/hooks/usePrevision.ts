import { useContext } from "react";
import { PrevisionContext } from "_/contexts/PrevisionContext";

export const usePrevision = () => useContext(PrevisionContext);
