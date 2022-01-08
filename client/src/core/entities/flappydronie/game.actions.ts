import { fg_h, pipe_h, pipe_w } from './sprites';
import { PipeSet } from './elements';
import {
  BACKGROUND_WRAPPER,
  BIRD,
  BIRD_DEFAULT_POSITION,
  BIRD_SKIN,
  COOLDOWN,
  FOREGROUND_WRAPPER,
  GAME,
  GAME_STATUS,
  HIGH_SCORE,
  LATEST_SCORE,
  PIPE_SETS,
  SCORE,
  STATUS,
} from './game.controller';

export const startGame = () => {
  STATUS.set(GAME_STATUS.PLAYING);
};

export const endGame = () => {
  if (STATUS.value === GAME_STATUS.PLAYING) {
    // Cooldown for no instant restart
    COOLDOWN.set(true);
    setTimeout(() => {
      COOLDOWN.set(false);
    }, 1000);

    STATUS.set(GAME_STATUS.SCORE);

    // Calculate High Score
    if (HIGH_SCORE.value < SCORE.value) {
      HIGH_SCORE.set(SCORE.value);
    }

    LATEST_SCORE.set(SCORE.value);
    SCORE.reset();
  }
};

export const resetGame = () => {
  // Reset Bird
  const bird = BIRD.nextStateValue;
  bird.lockRotation = false;
  bird.move({ cy: BIRD_DEFAULT_POSITION.y, cx: BIRD_DEFAULT_POSITION.x });
  bird.rotate(0);
  BIRD.ingest({ force: true });

  PIPE_SETS.reset();
  STATUS.set(GAME_STATUS.SPLASH);

  // Update Skins
  BIRD_SKIN.set(Math.floor(Math.random() * 20) + 1);
};

export const updateFrame = () => {
  GAME.update();

  // Update Scenery
  updateScenery();

  // Update Bird
  updateBird();
};

export const renderFrame = (lagOffset: number) => {
  BIRD.value.render(lagOffset);
  FOREGROUND_WRAPPER.value.render(lagOffset);
  BACKGROUND_WRAPPER.value.render(lagOffset);
  PIPE_SETS.value.forEach((pipeSet) => pipeSet.render(lagOffset));
};

export const updateBird = () => {
  const bird = BIRD.nextStateValue;
  const status = STATUS.value;

  const { canvasDimensions } = GAME;
  const { foregrounds } = FOREGROUND_WRAPPER.value;

  // If Splash Screen make the Bird hover
  if (status === GAME_STATUS.SPLASH) {
    const hoverHeight = 280;
    bird.hover(canvasDimensions.height - hoverHeight);
  }

  if (
    status === GAME_STATUS.PLAYING ||
    status === GAME_STATUS.SCORE // Apply physics to the Bird also in the Score status, to drop the bird when hitting a Pipe
  ) {
    bird.update();

    const collisionWithGround =
      bird.calculateCollision(foregrounds[0]) ||
      bird.calculateCollision(foregrounds[1]);

    // Handle collision with ground
    if (collisionWithGround) {
      bird.lockRotation = true;
      if (bird.cy >= canvasDimensions.height - fg_h - 10)
        bird.move({ cy: canvasDimensions.height - fg_h - 10 });

      endGame();
    }

    // Handle collision with top
    if (
      bird.calculateCollision({
        cx: 0,
        cy: 0,
        width: canvasDimensions.width,
        height: 10,
      })
    ) {
      if (bird.cy <= 0) bird.move({ cy: 0 });

      // Bounce
      bird.setVelocity(2);
    }
  }
};

export const jumpBird = () => {
  const bird = BIRD.nextStateValue;
  bird.jump();
};

export const updateScenery = () => {
  const status = STATUS.value;

  if (status === GAME_STATUS.SPLASH || status === GAME_STATUS.PLAYING) {
    // Update Background and Foreground
    BACKGROUND_WRAPPER.nextStateValue.update();
    FOREGROUND_WRAPPER.nextStateValue.update();

    // Update Pipes
    if (status === GAME_STATUS.PLAYING) updatePipes();
  }
};

export const updatePipes = () => {
  let pipeSets = PIPE_SETS.nextStateValue;
  const bird = BIRD.value;

  // Generate Pipe Sets
  if (
    pipeSets.length === 0 ||
    pipeSets[pipeSets.length - 1].movedCx >=
      pipeSets[pipeSets.length - 1].distance
  ) {
    pipeSets = pipeSets.concat(
      new PipeSet(GAME, {
        cx: pipe_h,
        cy: 0,
        distance: 200,
        gap: 120,
        renderCallback: (base, lagOffset) => {
          base.render(lagOffset);
          PIPE_SETS.ingest();
        },
      }),
    );
  }

  pipeSets.forEach((pipeSet) => {
    // End Game, if Bird collides with Pipe
    if (
      pipeSet.topPipe.calculateCollision(bird) ||
      pipeSet.bottomPipe.calculateCollision(bird)
    )
      endGame();

    // Calculate Score
    if (pipeSet.calculateCollision(bird) && !pipeSet.scored) {
      SCORE.set((v) => v + 1);
      pipeSet.scored = true;
    }

    pipeSet.update();

    // Remove pipes that go out of view
    if (pipeSet.cx < -pipe_w) pipeSets.splice(0, 1);

    return pipeSet;
  });
};

export const getScoreTweet = (score: number) =>
  `https://twitter.com/intent/tweet?text=I%20just%20played%20Flappy%20Dronie%20and%20managed%20to%20score%20${score}%21%20Can%20you%20beat%20me%3F%20Try%20it%20here%20https%3A//dronies.watch/lab%20and%20train%20your%20@DronieNFT%21`;
