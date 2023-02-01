import { IEdgeValues } from "_/types/Totem";

export const getEdgeValues = (edgeValues: IEdgeValues, newValue: number) => {
  if (edgeValues.max <= newValue) edgeValues.max = newValue;
  if (edgeValues.min >= newValue) edgeValues.min = newValue;

  return edgeValues;
};
