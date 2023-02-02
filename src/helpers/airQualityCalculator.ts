import { getCarbonMonoxideValues } from "./getCarbonMonoxideValues";
import { getNitrogenDioxideValues } from "./getNitrogenDioxideValues";
import { getParticlesValues } from "./getParticlesValues";

type polluterType = "nitrogeDioxide" | "particles" | "carbonMonoxide";

export const airQualityCalculator = (value: number, polluter: polluterType) => {
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

  const { qualityLevel } = getQualityScores(qualityValue);

  return { score: qualityValue, qualityLevel };
};

const polluterTableValues = (polluter: polluterType) => {
  switch (polluter) {
    case "carbonMonoxide":
      return getCarbonMonoxideValues;
    case "nitrogeDioxide":
      return getNitrogenDioxideValues;
    default:
      return getParticlesValues;
  }
};
