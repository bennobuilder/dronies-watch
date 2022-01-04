import { createState } from '@agile-ts/core';
import { ThemeTypes } from './themes';

export const THEME_TYPE = createState<ThemeTypes>('dark').persist({
  key: 'theme',
});
export const INITIALIZED_GA = createState(false);

export const MAX_WIDTH = 1100;
export const NAVBAR_HEIGHT = 100;
export const WIDTH_BREAK_POINTS = [480, 768, 996, MAX_WIDTH];
export const INNER_PADDING = 16; // for small devices

export const DRONIES_URL = 'https://www.droniesnft.com/';
export const API_URL = 'https://api.dronies.watch/v1';
