import { getCarbonMonoxideValues } from "./getCarbonMonoxideValues";
import { getNitrogenDioxideValues } from "./getNitrogenDioxideValues";
import { getOzone } from "./getOzone";
import { getParticlesValues } from "./getParticlesValues";

export type PolluterType =
  | "nitrogeDioxide"
  | "particles"
  | "carbonMonoxide"
  | "ozone";

export const POLLUTERS_VALUES = [
  "nitrogeDioxide",
  "particles",
  "carbonMonoxide",
  "ozone",
] as PolluterType[];

export const airQualityCalculator = (value: number, polluter: PolluterType) => {
  const getQualityScores = polluterTableValues(polluter);
  const qualityScore = getQualityScores(value);

  if (qualityScore.qualityLevel === 0)
    return { score: qualityScore.initialScore, qualityLevel: 0 };

  const scoreDiff = qualityScore.finalScore - qualityScore.initialScore;

  const concentrationDiff =
    qualityScore.finalConcentration - qualityScore.initialConcentration;

  const currentConcentrationDiff = value - qualityScore.initialConcentration;

  const qualityValue =
    qualityScore.initialScore +
    (scoreDiff / concentrationDiff) * currentConcentrationDiff;

  return { score: qualityValue, qualityLevel: qualityScore.qualityLevel };
};

const polluterTableValues = (polluter: PolluterType) => {
  switch (polluter) {
    case "carbonMonoxide":
      return getCarbonMonoxideValues;
    case "nitrogeDioxide":
      return getNitrogenDioxideValues;
    case "nitrogeDioxide":
      return getOzone;
    default:
      return getParticlesValues;
  }
};
