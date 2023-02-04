import { useContext } from "react";
import { LoaderContext } from "_/contexts/LoaderContext";

export const useLoader = () => useContext(LoaderContext);
