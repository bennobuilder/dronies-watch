import { createState } from '@agile-ts/core';
import { bg_h, bg_w, fg_h, fg_w } from './sprites';
import { Bird, Background, Foreground } from './elements';
import { FpsController } from './utils/FpsController';
import { Game } from './elements/Game';
import { PipeSet } from './elements/PipeSet';
import { createBird } from './game.actions';

// eslint-disable-next-line @typescript-eslint/naming-convention
export enum GAME_STATUS {
  SPLASH,
  PLAYING,
  SCORE,
}

export const GAME = new Game();
export const FPS_CONTROLLER = new FpsController(60);

// Configuration
export const BIRD_DEFAULT_POSITION = { x: 60, y: 0 };
export const PLAY_ONLINE = createState(false);
export const DEFAULT_CANVAS_DIMENSIONS = { width: 320, height: 480 };
export const SHOW_COLLIDER = createState(false);
export const BIRD_SKIN = createState(0);
export const VEHICLE_SKIN = createState(0);
export const MAP_SKIN = createState(0);

// Game Properties
export const FRAMES = createState(1);
GAME.syncFrame(FRAMES.value);
FRAMES.watch((v) => {
  GAME.syncFrame(v);
});
export const STATUS = createState<GAME_STATUS>(GAME_STATUS.SPLASH);
export const SCORE = createState(0);
export const LATEST_SCORE = createState(0).persist({ key: 'latest-score' });
export const HIGH_SCORE = createState(0).persist({ key: 'high-score' });
export const CANVAS_DIMENSIONS = createState<{ width: number; height: number }>(
  {
    width: window.innerWidth,
    height: DEFAULT_CANVAS_DIMENSIONS.height,
  },
);
GAME.syncCanvasDimensions(CANVAS_DIMENSIONS.value);
CANVAS_DIMENSIONS.watch((v) => {
  GAME.syncCanvasDimensions(v);
});

// Game Objects
export const PIPE_SETS = createState<PipeSet[]>([]);
export const BIRD = createState<Bird>(createBird());
// BIRD.watch((v) => {
//   if (PLAY_ONLINE.value)
//     socketService.socket?.emit('bird', { cx: v.cx, cy: v.cy });
// });
export const BACKGROUNDS = createState([
  new Background(GAME, { cx: 0, cy: CANVAS_DIMENSIONS.value.height - bg_h }),
  new Background(GAME, { cx: bg_w, cy: CANVAS_DIMENSIONS.value.height - bg_h }),
]);
export const FOREGROUNDS = createState([
  new Foreground(GAME, {
    cx: 0,
    cy: CANVAS_DIMENSIONS.value.height - fg_h,
    collisionBox: { height: fg_h - 20 },
  }),
  new Foreground(GAME, {
    cx: fg_w,
    cy: CANVAS_DIMENSIONS.value.height - fg_h,
    collisionBox: { height: fg_h - 20 },
  }),
]);
export const FOREGROUND_POSITION = createState(0);
export const BACKGROUND_POSITION = createState(0);
