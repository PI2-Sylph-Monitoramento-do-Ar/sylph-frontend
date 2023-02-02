import { useContext } from "react";
import { MeasureContext } from "_/contexts/MeasureContext";

export const useMeasure = () => useContext(MeasureContext);
