import { QualityScoreType } from "_/types/qualityScoreType";

export const getCarbonMonoxideValues = (
  concentrationColected: number
): QualityScoreType => {
  if (concentrationColected <= 4.5)
    return {
      qualityLevel: 6,
      initialScore: 0,
      finalScore: 50,
      initialConcentration: 0,
      finalConcentration: 4.5,
    };
  if (concentrationColected <= 9)
    return {
      qualityLevel: 5,
      initialScore: 51,
      finalScore: 100,
      initialConcentration: 4.5,
      finalConcentration: 9,
    };
  if (concentrationColected < 12)
    return {
      qualityLevel: 4,
      initialScore: 101,
      finalScore: 150,
      initialConcentration: 9.1,
      finalConcentration: 12,
    };
  if (concentrationColected < 15)
    return {
      qualityLevel: 3,
      initialScore: 151,
      finalScore: 199,
      initialConcentration: 12,
      finalConcentration: 15,
    };
  if (concentrationColected < 22)
    return {
      qualityLevel: 2,
      initialScore: 200,
      finalScore: 250,
      initialConcentration: 15,
      finalConcentration: 22,
    };
  if (concentrationColected < 30)
    return {
      qualityLevel: 1,
      initialScore: 251,
      finalScore: 299,
      initialConcentration: 22,
      finalConcentration: 30,
    };
  return {
    qualityLevel: 0,
    initialScore: 300,
    finalScore: Infinity,
    initialConcentration: 30,
    finalConcentration: Infinity,
  };
};
