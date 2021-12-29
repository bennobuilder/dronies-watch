import { createState } from '@agile-ts/core';
import { Pipe, Bird, Background, Foreground } from './sprites';
import { bg_h, bg_w, fg_h, fg_w } from '../../sprites';
import { height } from '../device';

// eslint-disable-next-line @typescript-eslint/naming-convention
export enum GAME_STATUS {
  SPLASH,
  PLAYING,
  SCORE,
}

// General
export const STATUS = createState<GAME_STATUS>(GAME_STATUS.SPLASH);
export const FRAMES = createState<number>(1);

// Objects
export const PIPES = createState<Pipe[]>([]);
export const BIRD = createState<Bird>(new Bird(60, 0));

// Scenery
export const BACKGROUNDS = createState([
  new Background(0, height - bg_h),
  new Background(bg_w, height - bg_h),
]);
export const FOREGROUNDS = createState([
  new Foreground(0, height - fg_h),
  new Foreground(fg_w, height - fg_h),
]);
export const FOREGROUND_POSITION = createState(0);
export const BACKGROUND_POSITION = createState(0);
