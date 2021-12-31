import { flappydronie } from '../../../../core';
import { GAME_STATUS } from '../../../../core/entities/flappydronie';

export const inputHandler = () => {
  switch (flappydronie.STATUS.value) {
    case GAME_STATUS.SPLASH:
      console.log('START GAME');
      flappydronie.startGame();
      flappydronie.jumpBird();
      break;
    case GAME_STATUS.PLAYING:
      console.log('JUMP');
      flappydronie.jumpBird();
      break;
    case GAME_STATUS.SCORE:
      console.log('RESTART');
      flappydronie.resetGame();
      break;
    default:
      break;
  }
};
