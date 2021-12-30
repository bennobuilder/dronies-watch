import React from 'react';
import { useAgile } from '@agile-ts/react';
import { flappydronie } from '../../../../../../core';
import { GAME_STATUS } from '../../../../../../core/entities/flappydronie';

const useGame = () => {
  const [backgrounds, foregrounds, bird, pipes, status] = useAgile([
    flappydronie.BACKGROUNDS,
    flappydronie.FOREGROUNDS,
    flappydronie.BIRD,
    flappydronie.PIPES,
    flappydronie.STATUS,
  ]);

  React.useEffect(() => {
    document.addEventListener('mousedown', () => {
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
    });

    const appUpdateFrame = () => {
      flappydronie.updateFrame();

      window.requestAnimationFrame(appUpdateFrame);
    };
    appUpdateFrame();
  }, []);

  return { backgrounds, foregrounds, bird, pipes, status };
};

export default useGame;
