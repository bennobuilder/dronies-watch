import { ThemePaths } from '../types';

import dark from './theme.dark';

// Themes
export const themes = {
  dark,
};

export default themes;

export { dark };

export * from './utils/mergeTheme';
export * from './utils/getSizeValue';
export * from './theme.default';

export type ThemeTypes = ThemePaths<typeof themes>;
