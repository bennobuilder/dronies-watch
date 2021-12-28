import { GAME_STATUS, STATUS } from './game.controller';

export const start = () => {
  STATUS.set(GAME_STATUS.PLAYING);
};

export const gameOver = () => {
  STATUS.set(GAME_STATUS.GAME_OVER);
};
