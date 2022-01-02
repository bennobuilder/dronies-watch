import {
  bg_h,
  bg_w,
  bird_h,
  bird_w,
  fg_h,
  fg_w,
  pipe_h,
  pipe_w,
} from './sprites';
import { Bird, PipeSet } from './elements';
import {
  BACKGROUND_POSITION,
  BACKGROUNDS,
  BIRD,
  BIRD_DEFAULT_POSITION,
  CANVAS_DIMENSIONS,
  FOREGROUND_POSITION,
  FOREGROUNDS,
  FRAMES,
  GAME,
  GAME_STATUS,
  HIGH_SCORE,
  LATEST_SCORE,
  PIPE_SETS,
  SCORE,
  STATUS,
} from './game.controller';

export const startGame = () => {
  if (STATUS.value !== GAME_STATUS.SPLASH) BIRD.set(createBird());

  STATUS.set(GAME_STATUS.PLAYING);
};

export const endGame = () => {
  if (STATUS.value === GAME_STATUS.PLAYING) {
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
  BIRD.set(createBird());
  FRAMES.reset();
  PIPE_SETS.reset();
  STATUS.set(GAME_STATUS.SPLASH);
};

export const createBird = () =>
  new Bird(GAME, {
    cx: BIRD_DEFAULT_POSITION.x,
    cy: BIRD_DEFAULT_POSITION.y,
    collisionBox: {
      width: bird_w - 10,
      height: bird_h - 10,
      offset: { x: 10, y: 5 },
    },
  });

export const updateFrame = () => {
  FRAMES.set((f) => f + 1);

  // Update Scenery
  updateScenery();

  // Update Bird
  // TODO optimize as the screen is also re-rendered although the bird doesn't move
  BIRD.set((b) => updateBird(b), { force: true });
};

export const updateScenery = () => {
  if (
    STATUS.value === GAME_STATUS.SPLASH ||
    STATUS.value === GAME_STATUS.PLAYING
  ) {
    const foregrounds = FOREGROUNDS.nextStateValue;
    const backgrounds = BACKGROUNDS.nextStateValue;
    const canvasDimensions = CANVAS_DIMENSIONS.value;

    const newForegroundPos = (FOREGROUND_POSITION.value - 2) % (fg_w - 5); // -5 to hide white stripe between the two images

    foregrounds[0].move({
      cx: newForegroundPos,
      cy: canvasDimensions.height - fg_h, // Required when resizing
    });
    foregrounds[1].move({
      cx: newForegroundPos + (fg_w - 5), // -5 to hide white stripe between the two images,
      cy: canvasDimensions.height - fg_h, // Required when resizing
    });

    // Apply changes to the UI
    FOREGROUND_POSITION.set(newForegroundPos);
    FOREGROUNDS.ingest();

    const newBackgroundPos = (BACKGROUND_POSITION.value - 0.5) % (bg_w - 5); // -5 to hide white stripe between the two images

    backgrounds[0].move({
      cx: newBackgroundPos,
      cy: canvasDimensions.height - bg_h, // Required when resizing
    });
    backgrounds[1].move({
      cx: newBackgroundPos + (bg_w - 5), // -5 to hide white stripe between the two images
      cy: canvasDimensions.height - bg_h, // Required when resizing
    });

    // Apply changes to the UI
    BACKGROUND_POSITION.set(newBackgroundPos);
    BACKGROUNDS.ingest();

    // Update Pipes
    if (STATUS.value === GAME_STATUS.PLAYING) updatePipes();
  }
};

export const updateBird = (bird: Bird): Bird => {
  const canvasDimensions = CANVAS_DIMENSIONS.value;
  const foregrounds = FOREGROUNDS.value;

  // If Splash Screen make the Bird hover
  if (STATUS.value === GAME_STATUS.SPLASH) {
    const hoverHeight = 280;
    bird.hover(canvasDimensions.height - hoverHeight);
  }

  if (
    STATUS.value === GAME_STATUS.PLAYING ||
    STATUS.value === GAME_STATUS.SCORE // Apply physics to the Bird also in the Score status, to drop the bird when hitting a Pipe
  ) {
    bird.calculateVelocity();

    const collisionWithGround =
      bird.calculateCollision(foregrounds[0]) ||
      bird.calculateCollision(foregrounds[1]);

    // Handle collision with bottom
    if (collisionWithGround) {
      // Set velocity to jump speed for correct rotation when crashing
      bird.setVelocity(bird.jumpForce);

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

    // Handle rotation
    if (!collisionWithGround) bird.calculateRotation();
  }

  return bird;
};

export const jumpBird = () => {
  const bird = BIRD.nextStateValue;
  bird.jump();
  BIRD.ingest({ force: true });
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
      new PipeSet(GAME, { cx: pipe_h, cy: 0, distance: 200, gap: 120 }),
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

    pipeSet.move();

    // Remove pipes that go out of view
    if (pipeSet.cx < -pipe_w) pipeSets.splice(0, 1);

    return pipeSet;
  });

  // Apply changes to the UI
  PIPE_SETS.set(pipeSets);
};

export const getScoreTweet = (score: number) =>
  `https://twitter.com/intent/tweet?text=I%20just%20played%20Flappy%20Dronie%20and%20managed%20to%20score%20${score}%21%20Can%20you%20beat%20me%3F%20Try%20it%20here%20https%3A//dronies.watch/lab%20and%20train%20your%20@DronieNFT%21`;
