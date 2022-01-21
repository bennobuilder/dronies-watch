import { ThemeTypes } from './themes';
import { SLOW_PERFORMANCE, THEME_TYPE } from './ui.controller';

export const setTheme = (type: ThemeTypes) => {
  THEME_TYPE.set(type);
};

export const setSlowPerformance = (value: boolean) => {
  SLOW_PERFORMANCE.set(value);
};
