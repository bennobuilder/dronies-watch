import { createState } from '@agile-ts/core';
import { ThemeTypes } from './themes';

export const THEME_TYPE = createState<ThemeTypes>('dark').persist({
  key: 'theme',
});
