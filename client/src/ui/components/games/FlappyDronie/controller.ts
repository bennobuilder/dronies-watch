import { flappydronie } from '../../../../core';
import { GAME_STATUS } from '../../../../core/entities/flappydronie';
import { trackEvent } from '../../../hooks/useEventTracker';

export const inputHandler = () => {
  if (!flappydronie.COOLDOWN.value) {
    switch (flappydronie.STATUS.value) {
      case GAME_STATUS.SPLASH:
        console.log('START GAME');

        flappydronie.startGame();
        flappydronie.jumpBird();

        // Analytics
        trackEvent({
          category: 'Flappy Dronie',
          action: 'start-game',
          label: 'Start Game',
        });

        break;
      case GAME_STATUS.PLAYING:
        console.log('JUMP');
        flappydronie.jumpBird();
        break;
      case GAME_STATUS.SCORE:
        console.log('RESTART');

        flappydronie.resetGame();

        // Analytics
        trackEvent({
          category: 'Flappy Dronie',
          action: 'score',
          label: `Scored: ${flappydronie.SCORE.value}`,
        });

        break;
      default:
        break;
    }
  }
};
