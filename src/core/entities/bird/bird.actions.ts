import { TRANSLATION } from './bird.controller';

export const fly = () => {
  TRANSLATION.set((s) => ({ y: s.y - 50, r: -30 }));
};

export const fall = () => {
  TRANSLATION.set((s) => ({ y: s.y + 20, r: 0 }));
};

export const reset = () => {
  TRANSLATION.reset();
};
