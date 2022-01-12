import { primitiveColors } from './colors';
import { OverwriteTheme } from '../types';

export const theme: OverwriteTheme = {
  primitiveColors,
  colors: {
    interactive: {
      primary: {
        n0: primitiveColors.green,
        p1: primitiveColors.green_lighter,
      },
    },
    layout: {
      p: primitiveColors.green_light,
      bg: primitiveColors.black,
      lc: primitiveColors.green_dark,
      hc: primitiveColors.white,
      rHc: primitiveColors.green_lighter,
      rHc2: primitiveColors.green,
    },
  },
};

export default {
  theme,
  type: 'dark',
};
