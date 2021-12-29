import Sprite from './parser/Sprite';
import sheet from '../../assets/sheet.png';

export const background_forest = Sprite({
  filename: sheet,
  x: 0,
  y: 0,
  width: 910,
  height: 512,
});

export const foreground_forest = Sprite({
  filename: sheet,
  x: 910,
  y: 823,
  width: 910,
  height: 100,
});

export const plane = Sprite({
  filename: sheet,
  x: 1686,
  y: 743,
  width: 134,
  height: 80,
});

export const pipe_n = Sprite({
  filename: sheet,
  x: 1624,
  y: 0,
  width: 105,
  height: 650,
});

export const pipe_s = Sprite({
  filename: sheet,
  x: 1724,
  y: 0,
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
