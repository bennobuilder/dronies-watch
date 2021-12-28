import { createState } from '@agile-ts/core';

// eslint-disable-next-line @typescript-eslint/naming-convention
export enum GAME_STATUS {
  PLAYING,
  GAME_OVER,
  PAUSE,
}

export const STATUS = createState<GAME_STATUS>(GAME_STATUS.GAME_OVER);
