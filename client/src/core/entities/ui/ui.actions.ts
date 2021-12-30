import { ThemeTypes } from './themes';
import { THEME_TYPE } from './ui.controller';

export const setTheme = (type: ThemeTypes) => {
  THEME_TYPE.set(type);
};
