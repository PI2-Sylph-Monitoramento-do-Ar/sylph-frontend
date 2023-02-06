import { IEdgeValues } from "_/types/Totem";

export const getEdgeValues = (edgeValues: IEdgeValues, newValue?: number) => {
  if (newValue) {
    if (edgeValues.max <= newValue) edgeValues.max = Math.round(newValue);
    if (edgeValues.min >= newValue) edgeValues.min = Math.round(newValue);
  }
  return edgeValues;
};
