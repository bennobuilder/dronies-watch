import { Bird, Pipe } from './sprites';
import {
  BACKGROUND_POSITION,
  BACKGROUNDS,
  BIRD,
  FOREGROUND_POSITION,
  FOREGROUNDS,
  FRAMES,
  GAME_STATUS,
  PIPES,
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
  // BIRD.set(new Bird(60, 0));
  FRAMES.reset();
  PIPES.reset();

  STATUS.set(GAME_STATUS.PLAYING);
};

export const updateFrame = () => {
  FRAMES.set((f) => f + 1);

  // Update Scenery
  if (
    STATUS.value === GAME_STATUS.SPLASH ||
    STATUS.value === GAME_STATUS.PLAYING
  ) {
    const newForegroundPos = (FOREGROUND_POSITION.value - 2) % fg_w;
    FOREGROUND_POSITION.set(newForegroundPos);
    FOREGROUNDS.nextStateValue[0].cx = newForegroundPos;
    FOREGROUNDS.nextStateValue[1].cx = newForegroundPos + fg_w;
    FOREGROUNDS.ingest();

    const newBackgroundPos = (BACKGROUND_POSITION.value - 0.5) % bg_w;
    BACKGROUND_POSITION.set(newBackgroundPos);
    BACKGROUNDS.nextStateValue[0].cx = newBackgroundPos;
    BACKGROUNDS.nextStateValue[1].cx = newBackgroundPos + bg_w;
    BACKGROUNDS.ingest();
  }

  // Update Bird
  BIRD.set((b) => updateBird(b), { force: true });

  // Update Pipes
  if (STATUS.value === GAME_STATUS.PLAYING) {
    PIPES.set((p) => updatePipes(p));
  }
};

export const updateBird = (bird: Bird): Bird => {
  // If Splash Screen make the Bird hover
  if (STATUS.value === GAME_STATUS.SPLASH) {
    bird.cy = HEIGHT - 280 + 5 * Math.cos(FRAMES.value / 10); // ~199 - ~201
    bird.rotation = 0;
  }

  if (STATUS.value === GAME_STATUS.PLAYING) {
    // Handle velocity
    bird.velocity += bird.gravity;
    bird.cy += bird.velocity;

    // Handle collision with bottom
    const bottomCollisionHeight = HEIGHT - fg_h - 10;
    if (bird.cy >= bottomCollisionHeight) {
      bird.cy = bottomCollisionHeight;
      // sets velocity to jump speed for correct rotation
      bird.velocity = bird.jump;

      // End Game
      if (STATUS.value === GAME_STATUS.PLAYING) STATUS.set(GAME_STATUS.SCORE);
    }

    // Handle collision with top

    // Handle rotation
    if (bird.velocity >= bird.jump) {
      // When bird lacks upward momentum increment the rotation angle
      bird.rotation = Math.min(Math.PI / 2.5, bird.rotation + 0.3);
    } else {
      bird.rotation = -0.3;
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
    if (calculateCollisionWithPipe(pipe)) {
      STATUS.set(GAME_STATUS.SCORE);
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
