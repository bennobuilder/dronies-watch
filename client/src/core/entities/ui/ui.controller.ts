import { createState } from '@agile-ts/core';
import { ThemeTypes } from './themes';

export const THEME_TYPE = createState<ThemeTypes>('dark').persist({
  key: 'theme',
});

export const MAX_WIDTH = 1100;
export const NAVBAR_HEIGHT = 100;
export const BREAK_POINTS = [768, 996];

export const DRONIES_URL = 'https://www.droniesnft.com/';
