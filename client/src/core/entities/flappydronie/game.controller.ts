import { createState } from '@agile-ts/core';
import { bg_h, bg_w, fg_h, fg_w } from './sprites';
import { Pipe, Bird, Background, Foreground } from './elements';
import { FpsController } from './utils/FpsController';

// eslint-disable-next-line @typescript-eslint/naming-convention
export enum GAME_STATUS {
  SPLASH,
  PLAYING,
  SCORE,
}

// Configuration
export const BIRD_DEFAULT_POSITION = { x: 60, y: 0 };

// General
export const PLAY_ONLINE = createState(false);
export const STATUS = createState<GAME_STATUS>(GAME_STATUS.SPLASH);
export const FRAMES = createState(1);
export const SCORE = createState(0);
export const LATEST_SCORE = createState(0).persist({ key: 'latest-score' });
export const HIGH_SCORE = createState(0).persist({ key: 'high-score' });
export const DEFAULT_CANVAS_DIMENSIONS = { width: 320, height: 480 };
export const CANVAS_DIMENSIONS = createState<{ width: number; height: number }>(
  {
    width: window.innerWidth,
    height: DEFAULT_CANVAS_DIMENSIONS.height,
  },
);
export const FPS_CONTROLLER = new FpsController(60);
export const BIRD_SKIN = createState(0);
export const VEHICLE_SKIN = createState(0);
export const MAP_SKIN = createState(0);
export const GAP = createState(120);

// Objects
export const PIPES = createState<Pipe[]>([]);
export const BIRD = createState<Bird>(
  new Bird({ cx: BIRD_DEFAULT_POSITION.x, cy: BIRD_DEFAULT_POSITION.y }),
);
// BIRD.watch((v) => {
//   if (PLAY_ONLINE.value)
//     socketService.socket?.emit('bird', { cx: v.cx, cy: v.cy });
// });

// Scenery
export const BACKGROUNDS = createState([
  new Background({ cx: 0, cy: CANVAS_DIMENSIONS.value.height - bg_h }),
  new Background({ cx: bg_w, cy: CANVAS_DIMENSIONS.value.height - bg_h }),
]);
export const FOREGROUNDS = createState([
  new Foreground({ cx: 0, cy: CANVAS_DIMENSIONS.value.height - fg_h }),
  new Foreground({ cx: fg_w, cy: CANVAS_DIMENSIONS.value.height - fg_h }),
]);
export const FOREGROUND_POSITION = createState(0);
export const BACKGROUND_POSITION = createState(0);
