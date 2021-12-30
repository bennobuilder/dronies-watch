import { createState } from '@agile-ts/core';
import { ThemeTypes } from './themes';

export const THEME_TYPE = createState<ThemeTypes>('dark').persist({
  key: 'theme',
});

export const MAX_WIDTH = 1100;
export const NAVBAR_HEIGHT = 100;

let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;

if (windowWidth >= 500) {
  windowWidth = 320;
  windowHeight = 480;
}

export const WIDTH = windowWidth;
export const HEIGHT = windowHeight;

export const SPRITE_SHEET = {
  width: 2145,
  height: 2600,
};

export const DRONIES_URL = 'https://www.droniesnft.com/';
