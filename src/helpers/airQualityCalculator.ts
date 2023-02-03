import { getCarbonMonoxideValues } from "./getCarbonMonoxideValues";
import { getNitrogenDioxideValues } from "./getNitrogenDioxideValues";
import { getParticlesValues } from "./getParticlesValues";

export type PolluterType = "nitrogeDioxide" | "particles" | "carbonMonoxide";

export const POLLUTERS_VALUES = [
  "nitrogeDioxide",
  "particles",
  "carbonMonoxide",
] as PolluterType[];

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
    default:
      return getParticlesValues;
  }
};
