import { generateId } from '@agile-ts/core';
import { PIPES, TRANSLATION } from './pipe.controller';

export const running = () => {
  TRANSLATION.set((s) => ({ x: s.x - 10 }));
};

export const generate = () => {
  const topHeight = Math.round(Math.random() * 200) + 40;

  PIPES.nextStateValue.push({ id: generateId(), topHeight });
  PIPES.ingest();
};

export const reset = () => {
  PIPES.reset();
};
