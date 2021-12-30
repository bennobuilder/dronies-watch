import { primitiveColors } from './colors';
import { OverwriteTheme } from '../types';

export const theme: OverwriteTheme = {
  primitiveColors,
  colors: {
    interactive: {
      primary: {
        p0: primitiveColors.green,
      },
    },
    layout: {
      p: primitiveColors.green_light,
      bg: primitiveColors.black,
      lc: primitiveColors.green_dark,
      hc: primitiveColors.white,
      rHc: primitiveColors.green_lighter,
    },
  },
};

export default {
  theme,
  type: 'dark',
};
