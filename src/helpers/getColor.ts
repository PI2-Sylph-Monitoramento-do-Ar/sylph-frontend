import { COLORS } from "_/constants/colors";

export const getQualityColor = (value: number) => {
  switch (value) {
    case 0:
      return COLORS.COLOR_QUALITY_0;
    case 1:
      return COLORS.COLOR_QUALITY_1;
    case 2:
      return COLORS.COLOR_QUALITY_2;
    case 3:
      return COLORS.COLOR_QUALITY_3;
    case 4:
      return COLORS.COLOR_QUALITY_4;
    case 5:
      return COLORS.COLOR_QUALITY_5;
    case 6:
      return COLORS.COLOR_QUALITY_6;
  }
};

export const getQualityColorWithOpacity = (value: number) => {
  switch (value) {
    case 0:
      return COLORS.COLOR_QUALITY_0_OPPACITY;
    case 1:
      return COLORS.COLOR_QUALITY_1_OPPACITY;
    case 2:
      return COLORS.COLOR_QUALITY_2_OPPACITY;
    case 3:
      return COLORS.COLOR_QUALITY_3_OPPACITY;
    case 4:
      return COLORS.COLOR_QUALITY_4_OPPACITY;
    case 5:
      return COLORS.COLOR_QUALITY_5_OPPACITY;
    case 6:
      return COLORS.COLOR_QUALITY_6_OPPACITY;
  }
};
