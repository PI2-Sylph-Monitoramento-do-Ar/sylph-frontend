import { GraphValues } from "_/screens/ChartsScreen";
import { PrevisionDto } from "_/types/dto/prevision";

export const mapPrevisionsToGraph = (
  prevision: PrevisionDto
): GraphValues[] => {
  const date = new Date()
  const _previsions = prevision.previsions.map((value) => {
    date.setHours(date.getHours()+1)
    return { x: date.toISOString(), y: value };
  });

  return _previsions as GraphValues[];
};
