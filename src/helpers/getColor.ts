import { COLORS } from "_/constants/colors";

export const getQualityColor = (value: number) => {
  if (value < 3) return COLORS.BAD_AIR_COLOR;
  if (value < 5) return COLORS.REGULAR_AIR_COLOR;
  return COLORS.GOOD_AIR_COLOR;
};

export const getQualityColorWithOpacity = (value: number) => {
  if (value < 3) return COLORS.BAD_AIR_COLOR_OPACITY;
  if (value < 5) return COLORS.REGULAR_AIR_COLOR_OPACITY;
  return COLORS.GOOD_AIR_COLOR_OPACITY;
};
