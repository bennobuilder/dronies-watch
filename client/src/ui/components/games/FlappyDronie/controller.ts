import { flappydronie } from '../../../../core';
import { GAME_STATUS } from '../../../../core/entities/flappydronie';
import { trackEvent } from '../../../hooks/useEventTracker';

export const inputHandler = () => {
  if (!flappydronie.COOLDOWN.value) {
    switch (flappydronie.STATUS.value) {
      case GAME_STATUS.SPLASH:
        console.log('START GAME');

        // Analytics
        trackEvent({
          category: 'Flappy Dronie',
          action: 'start-game',
          label: 'Start Game',
        });

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
  }
};
