import { bird, game, pipes } from '../../core';
import { GAME_STATUS } from '../../core/entities/game';

let gameLoop: NodeJS.Timeout | null = null;
let pipeGenerator: NodeJS.Timeout | null = null;

export const flap = () => {
  bird.flap();
};

export const startGame = () => {
  const status = game.STATUS.value;

  if (status !== GAME_STATUS.PLAYING) {
    gameLoop = setInterval(() => {
      bird.fall();
      pipes.running();
      validateBirdPosition();
    }, 200);

    pipeGenerator = setInterval(() => {
      pipes.generate();
    }, 3000);

    game.start();
  }
};

export const resetGame = () => {
  if (gameLoop != null) clearInterval(gameLoop);

  if (pipeGenerator != null) clearInterval(pipeGenerator);
};

const gameOver = () => {
  game.gameOver();
  resetGame();
};

const validateBirdPosition = () => {
  const birdY = bird.TRANSLATION.value.y;
  const pipesArray = pipes.PIPES.value;
  const pipesX = pipes.TRANSLATION.value.x;

  const challenge = pipesArray
    .map(({ topHeight }, i) => ({
      x1: pipesX + i * 200,
      y1: topHeight,
      x2: pipesX + i * 200,
      y2: topHeight + 100,
    }))
    .filter(({ x1 }) => {
      if (x1 > 0 && x1 < 288) {
        return true;
      }
      return false;
    });

  if (birdY > 512 - 108) {
    gameOver();
  }

  if (challenge.length) {
    const { x1, y1, x2, y2 } = challenge[0];

    if (
      (x1 < 120 && x1 + 52 > 120 && birdY < y1) ||
      (x2 < 120 && x2 + 52 > 120 && birdY > y2)
    ) {
      gameOver();
    }
  }
};
