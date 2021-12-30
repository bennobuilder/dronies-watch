import Sprite from './parser/Sprite';
import sheet from '../../assets/games/flappydronie/sheet.png';

export const backgrounds = Array.from(Array(2)).map((v, i) =>
  Sprite({
    filename: sheet,
    x: 0,
    y: i * (1085 + 5),
    width: 1920,
    height: 1080,
  }),
);

export const foregrounds = Array.from(Array(2)).map((v, i) =>
  Sprite({
    filename: sheet,
    x: 0,
    y: 2170 + i * (211 + 5),
    width: 1920,
    height: 211,
  }),
);

export const plane = Sprite({
  filename: sheet,
  x: 1925,
  y: 1662,
  width: 134,
  height: 80,
});

export const dronies = Array.from(Array(21)).map((v, i) =>
  Sprite({
    filename: sheet,
    x: 1925,
    y: i * (50 + 5),
    width: 85,
    height: 50,
  }),
);

export const pipe_n = Sprite({
  filename: sheet,
  x: 1925,
  y: 1747,
  width: 105,
  height: 850,
});

export const pipe_s = Sprite({
  filename: sheet,
  x: 2035,
  y: 1747,
  width: 105,
  height: 850,
});

export const bg_h = backgrounds[0]?.props['data-h']; // all backgrounds maintain the same height
export const bg_w = backgrounds[0]?.props['data-w']; // all backgrounds maintain the same width
export const fg_h = foregrounds[0]?.props['data-h']; // all foregrounds maintain the same height
export const fg_w = foregrounds[0]?.props['data-w']; // all foregrounds maintain the same width
export const pipe_h = pipe_n?.props['data-h']; // both pipe north and south maintain same height
export const pipe_w = pipe_n?.props['data-w']; // both pipe north and south maintain same width
export const bird_h = plane?.props['data-h'];
export const bird_w = plane?.props['data-w'];
