import { QualityScoreType } from "_/types/qualityScoreType";

export const getNitrogenDioxideValues = (
  concentrationColected: number
): QualityScoreType => {
  if (concentrationColected <= 100)
    return {
      qualityLevel: 6,
      initialScore: 0,
      finalScore: 50,
      initialConcentration: 0,
      finalConcentration: 100,
    };
  if (concentrationColected <= 320)
    return {
      qualityLevel: 5,
      initialScore: 51,
      finalScore: 100,
      initialConcentration: 101,
      finalConcentration: 320,
    };
  if (concentrationColected <= 720)
    return {
      qualityLevel: 4,
      initialScore: 101,
      finalScore: 150,
      initialConcentration: 321,
      finalConcentration: 720,
    };
  if (concentrationColected < 1130)
    return {
      qualityLevel: 3,
      initialScore: 151,
      finalScore: 199,
      initialConcentration: 721,
      finalConcentration: 1129,
    };
  if (concentrationColected <= 1690)
    return {
      qualityLevel: 2,
      initialScore: 200,
      finalScore: 250,
      initialConcentration: 1130,
      finalConcentration: 1690,
    };
  if (concentrationColected < 2260)
    return {
      qualityLevel: 1,
      initialScore: 251,
      finalScore: 299,
      initialConcentration: 1691,
      finalConcentration: 2290,
    };
  return {
    qualityLevel: 0,
    initialScore: 300,
    finalScore: Infinity,
    initialConcentration: 2291,
    finalConcentration: Infinity,
  };
};
