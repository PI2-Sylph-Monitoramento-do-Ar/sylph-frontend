export type QualityLevelType = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface QualityScoreType {
  qualityLevel: QualityLevelType;
  initialScore: number;
  finalScore: number;
  initialConcentration: number;
  finalConcentration: number;
}
