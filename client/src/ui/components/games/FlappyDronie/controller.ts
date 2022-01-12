import { flappydronie } from '../../../../core';
import { trackEvent } from '../../../hooks/useEventTracker';
import { GAME_STATUS } from '../../../../core/entities/flappydronie';

export const inputHandler = () => {
  const cooldown = flappydronie.COOLDOWN.value;
  const status = flappydronie.STATUS.value;

  if (!cooldown) {
    switch (status) {
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

export const toggledDeveloperMode = () => {
  flappydronie.SHOW_COLLIDERS.set((v) => !v);
  flappydronie.SHOW_PERFORMANCE.set((v) => !v);
};
