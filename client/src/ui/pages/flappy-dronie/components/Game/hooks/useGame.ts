import React from 'react';
import { useAgile } from '@agile-ts/react';
import { game } from '../../../../../../core';
import { GAME_STATUS } from '../../../../../../core/entities/game';

const useGame = () => {
  const [backgrounds, foregrounds, bird, pipes, status] = useAgile([
    game.BACKGROUNDS,
    game.FOREGROUNDS,
    game.BIRD,
    game.PIPES,
    game.STATUS,
  ]);

  React.useEffect(() => {
    document.addEventListener('mousedown', () => {
      switch (game.STATUS.value) {
        case GAME_STATUS.SPLASH:
          console.log('START GAME');
          game.startGame();
          game.jumpBird();
          break;
        case GAME_STATUS.PLAYING:
          console.log('JUMP');
          game.jumpBird();
          break;
        case GAME_STATUS.SCORE:
          console.log('RESTART');
          game.resetGame();
          break;
        default:
          break;
      }
    });

    const appUpdateFrame = () => {
      game.updateFrame();

      window.requestAnimationFrame(appUpdateFrame);
    };
    appUpdateFrame();
  }, []);

  return { backgrounds, foregrounds, bird, pipes, status };
};

export default useGame;
