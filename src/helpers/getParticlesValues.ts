import { QualityScoreType } from "_/types/qualityScoreType";

export const getParticlesValues = (
  concentrationColected: number
): QualityScoreType => {
  if (concentrationColected <= 50)
    return {
      qualityLevel: 6,
      initialScore: 0,
      finalScore: 50,
      initialConcentration: 0,
      finalConcentration: 50,
    };
  if (concentrationColected <= 150)
    return {
      qualityLevel: 5,
      initialScore: 51,
      finalScore: 100,
      initialConcentration: 51,
      finalConcentration: 150,
    };
  if (concentrationColected <= 200)
    return {
      qualityLevel: 4,
      initialScore: 101,
      finalScore: 150,
      initialConcentration: 151,
      finalConcentration: 200,
    };
  if (concentrationColected < 250)
    return {
      qualityLevel: 3,
      initialScore: 151,
      finalScore: 199,
      initialConcentration: 201,
      finalConcentration: 249,
    };
  if (concentrationColected <= 350)
    return {
      qualityLevel: 2,
      initialScore: 200,
      finalScore: 250,
      initialConcentration: 250,
      finalConcentration: 350,
    };
  if (concentrationColected < 420)
    return {
      qualityLevel: 1,
      initialScore: 251,
      finalScore: 299,
      initialConcentration: 351,
      finalConcentration: 419,
    };
  return {
    qualityLevel: 0,
    initialScore: 300,
    finalScore: Infinity,
    initialConcentration: 420,
    finalConcentration: Infinity,
  };
};
