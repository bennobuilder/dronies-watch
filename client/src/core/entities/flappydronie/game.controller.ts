import { createState } from '@agile-ts/core';
import {
  bg_h,
  bg_w,
  fg_h,
  fg_w,
  Pipe,
  Bird,
  Background,
  Foreground,
} from './sprites';
import { socketService } from '../../socket';

// eslint-disable-next-line @typescript-eslint/naming-convention
export enum GAME_STATUS {
  SPLASH,
  PLAYING,
  SCORE,
}

// Configuration
export const BIRD_POSITION = 60;

// General
export const PLAY_ONLINE = createState(false);
export const STATUS = createState<GAME_STATUS>(GAME_STATUS.SPLASH);
export const FRAMES = createState(1);
export const SCORE = createState(0);
export const HIGH_SCORE = createState(0).persist({ key: 'high-score' });
export const CANVAS_DIMENSIONS = createState<{ width: number; height: number }>(
  {
    width: window.innerWidth,
    height: window.innerHeight,
  },
);

// Objects
export const PIPES = createState<Pipe[]>([]);
export const BIRD = createState<Bird>(new Bird(BIRD_POSITION, 0));
BIRD.watch((v) => {
  if (PLAY_ONLINE.value)
    socketService.socket?.emit('bird', { cx: v.cx, cy: v.cy });
});

// Scenery
export const BACKGROUNDS = createState([
  new Background(0, CANVAS_DIMENSIONS.value.height - bg_h),
  new Background(bg_w, CANVAS_DIMENSIONS.value.height - bg_h),
]);
export const FOREGROUNDS = createState([
  new Foreground(0, CANVAS_DIMENSIONS.value.height - fg_h),
  new Foreground(fg_w, CANVAS_DIMENSIONS.value.height - fg_h),
]);
export const FOREGROUND_POSITION = createState(0);
export const BACKGROUND_POSITION = createState(0);