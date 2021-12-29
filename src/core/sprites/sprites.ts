import Sprite from './parser/Sprite';
import sheet from '../../assets/sheet.png';

export const background_forest = Sprite({
  filename: sheet,
  x: 0,
  y: 0,
  width: 1920,
  height: 1080,
});

export const foreground_forest = Sprite({
  filename: sheet,
  x: 1920,
  y: 1738,
  width: 1920,
  height: 211,
});

export const plane = Sprite({
  filename: sheet,
  x: 2130,
  y: 1658,
  width: 134,
  height: 80,
});

export const pipe_n = Sprite({
  filename: sheet,
  x: 1920,
  y: 1088,
  width: 105,
  height: 650,
});

export const pipe_s = Sprite({
  filename: sheet,
  x: 2025,
  y: 1088,
  width: 105,
  height: 650,
});

export const bg_h = background_forest?.props['data-h']; // all backgrounds maintain the same height
export const bg_w = background_forest?.props['data-w']; // all backgrounds maintain the same width
export const fg_h = foreground_forest?.props['data-h']; // all foregrounds maintain the same height
export const fg_w = foreground_forest?.props['data-w']; // all foregrounds maintain the same width
export const pipe_h = pipe_n?.props['data-h']; // both pipe north and south maintain same height
export const pipe_w = pipe_n?.props['data-w']; // both pipe north and south maintain same width
export const bird_h = plane?.props['data-h'];
export const bird_w = plane?.props['data-w'];
