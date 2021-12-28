import { createState } from '@agile-ts/core';

export const TRANSLATION = createState<TPosition>({ y: 250, r: 0 });

type TPosition = {
  y: number;
  r: number;
};
