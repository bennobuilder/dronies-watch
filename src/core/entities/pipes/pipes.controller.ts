import { createState } from '@agile-ts/core';

export const TRANSLATION = createState<TPosition>({ x: 300 });
export const PIPES = createState<TPipe[]>([]);

type TPosition = {
  x: number;
};

type TPipe = { id: string; topHeight: number };
