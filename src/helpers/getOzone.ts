import { QualityScoreType } from "_/types/qualityScoreType";

export const getOzone = (concentrationColected: number): QualityScoreType => {
  if (concentrationColected <= 80)
    return {
      qualityLevel: 6,
      initialScore: 0,
      finalScore: 50,
      initialConcentration: 0,
      finalConcentration: 80,
    };
  if (concentrationColected <= 160)
    return {
      qualityLevel: 5,
      initialScore: 51,
      finalScore: 100,
      initialConcentration: 81,
      finalConcentration: 160,
    };
  if (concentrationColected <= 180)
    return {
      qualityLevel: 4,
      initialScore: 101,
      finalScore: 150,
      initialConcentration: 161,
      finalConcentration: 180,
    };
  if (concentrationColected < 200)
    return {
      qualityLevel: 3,
      initialScore: 151,
      finalScore: 199,
      initialConcentration: 181,
      finalConcentration: 199,
    };
  if (concentrationColected <= 400)
    return {
      qualityLevel: 2,
      initialScore: 200,
      finalScore: 250,
      initialConcentration: 200,
      finalConcentration: 400,
    };
  if (concentrationColected < 800)
    return {
      qualityLevel: 1,
      initialScore: 251,
      finalScore: 299,
      initialConcentration: 401,
      finalConcentration: 799,
    };
  return {
    qualityLevel: 0,
    initialScore: 300,
    finalScore: Infinity,
    initialConcentration: 800,
    finalConcentration: Infinity,
  };
};
