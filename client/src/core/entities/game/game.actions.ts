import { Bird, Pipe } from './sprites';
import {
  BACKGROUND_POSITION,
  BACKGROUNDS,
  BIRD,
  BIRD_POSITION,
  FOREGROUND_POSITION,
  FOREGROUNDS,
  FRAMES,
  GAME_STATUS,
  HIGH_SCORE,
  PIPES,
  SCORE,
  STATUS,
} from './game.controller';
import {
  bg_w,
  bird_h,
  bird_w,
  fg_h,
  fg_w,
  pipe_h,
  pipe_w,
} from '../../sprites';
import { HEIGHT } from '../ui';

export const startGame = () => {
  if (STATUS.value !== GAME_STATUS.SPLASH) BIRD.set(new Bird(BIRD_POSITION, 0));

  STATUS.set(GAME_STATUS.PLAYING);
};

export const endGame = () => {
  if (STATUS.value === GAME_STATUS.PLAYING) {
    STATUS.set(GAME_STATUS.SCORE);

    // Calculate High Score
    if (HIGH_SCORE.value < SCORE.value) {
      HIGH_SCORE.set(SCORE.value);
    }

    SCORE.reset();
  }
};

export const resetGame = () => {
  BIRD.set(new Bird(BIRD_POSITION, 0));
  FRAMES.reset();
  PIPES.reset();
  STATUS.set(GAME_STATUS.SPLASH);
};

export const updateFrame = () => {
  FRAMES.set((f) => f + 1);

  // Update Scenery
  if (
    STATUS.value === GAME_STATUS.SPLASH ||
    STATUS.value === GAME_STATUS.PLAYING
  ) {
    const newForegroundPos = (FOREGROUND_POSITION.value - 2) % (fg_w - 5); // -5 to hide white stripe between the two images
    FOREGROUND_POSITION.set(newForegroundPos);
    FOREGROUNDS.nextStateValue[0].cx = newForegroundPos;
    FOREGROUNDS.nextStateValue[1].cx = newForegroundPos + (fg_w - 5); // -5 to hide white stripe between the two images
    FOREGROUNDS.ingest();

    const newBackgroundPos = (BACKGROUND_POSITION.value - 0.5) % (bg_w - 5); // -5 to hide white stripe between the two images
    BACKGROUND_POSITION.set(newBackgroundPos);
    BACKGROUNDS.nextStateValue[0].cx = newBackgroundPos;
    BACKGROUNDS.nextStateValue[1].cx = newBackgroundPos + (bg_w - 5); // -5 to hide white stripe between the two images
    BACKGROUNDS.ingest();

    // Update Bird
    BIRD.set((b) => updateBird(b), { force: true });

    // Update Pipes
    if (STATUS.value === GAME_STATUS.PLAYING) PIPES.set((p) => updatePipes(p));
  }
};

export const updateBird = (bird: Bird): Bird => {
  // If Splash Screen make the Bird hover
  if (STATUS.value === GAME_STATUS.SPLASH) {
    bird.cy = HEIGHT - 280 + 5 * Math.cos(FRAMES.value / 10); // ~199 - ~201
    bird.rotation = 0;
  }

  if (
    STATUS.value === GAME_STATUS.PLAYING ||
    STATUS.value === GAME_STATUS.SCORE // Apply physics to the Bird also in the Score status, to drop the bird when hitting a pipe
  ) {
    // Handle velocity
    bird.velocity += bird.gravity;
    bird.cy += bird.velocity;

    // Handle collision with bottom
    const bottomCollisionHeight = HEIGHT - fg_h - 10;
    if (bird.cy >= bottomCollisionHeight) {
      bird.cy = bottomCollisionHeight;

      // Set velocity to jump speed for correct rotation
      bird.velocity = bird.jump;

      endGame();
    }

    // Handle collision with top
    if (bird.cy <= 0) {
      bird.cy = 0;

      // Set velocity to jump speed for creating a bounce
      bird.velocity = bird.jump;
    }

    // Handle rotation
    if (bird.velocity >= bird.jump) {
      // When bird lacks upward momentum increment the rotation angle
      bird.rotation = Math.min(Math.PI / 2.5, bird.rotation + 0.1);
    } else {
      bird.rotation = Math.max(-0.3, bird.rotation - 0.1);
    }
  }

  return bird;
};

export const jumpBird = () => {
  BIRD.nextStateValue.velocity = -BIRD.value.jump;
  BIRD.ingest({ force: true });
};

export const updatePipes = (pipes: Pipe[]) => {
  // Generate a Pipe every 100 frame
  if (FRAMES.value % 100 === 0) {
    pipes = pipes.concat(generatePipeSet());
  }

  // Calculate collision and move Pipes
  pipes.forEach((pipe) => {
    // End Game, if collision with Pipe
    if (calculateCollisionWithPipe(pipe)) endGame();

    // Calculate Score
    if (pipe.cx <= BIRD_POSITION && !pipe.scored && pipe.type === 'N') {
      SCORE.set((v) => v + 1);
      pipe.scored = true;
    }

    // Move the Pipe towards the left
    pipe.cx -= 2;

    // If the Pipe isn't visible anymore, remove it
    if (pipe.cx < -pipe_w) {
      pipes.splice(0, 2); // remove first 2 pipe
    }

    return pipe;
  });

  return pipes;
};

export const calculateCollisionWithPipe = (pipe: Pipe): boolean => {
  const bird = BIRD.value;
  const cx = Math.min(
    Math.max(bird.cx + bird_w / 2, pipe.cx),
    pipe.cx + pipe_w,
  );
  const cy = Math.min(
    Math.max(bird.cy + bird_h / 2, pipe.cy),
    pipe.cy + pipe_h,
  );

  // Closest difference
  const dx = bird.cx + bird_w / 2 - cx;
  const dy = bird.cy + bird_h / 2 - cy;

  // Vector length
  const d1 = dx * dx + dy * dy;
  const r = bird.radius * bird.radius;

  // Determine intersection/collision of the Pipe with the Bird
  return r > d1;
};

export const generatePipeSet = () => {
  const randomYPos = HEIGHT - (pipe_h + fg_h + 120 + 200 * Math.random());
  return [
    new Pipe(pipe_h, randomYPos, 'S'),
    new Pipe(pipe_h, randomYPos + 100 + pipe_h, 'N'),
  ];
};
