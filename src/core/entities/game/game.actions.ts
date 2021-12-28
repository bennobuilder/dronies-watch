import { Pipe, Bird } from './sprites';
import {
  BIRD,
  FOREGROUND_POSITION,
  FRAMES,
  GAME_STATUS,
  PIPES,
  STATUS,
} from './game.controller';
import { bird_h, bird_w, fg_h, pipe_h, pipe_w } from '../../sprites';
import { height } from '../device';

export const startGame = () => {
  BIRD.set(new Bird(60, 0));
  FOREGROUND_POSITION.reset();
  FRAMES.reset();
  PIPES.reset();

  STATUS.set(GAME_STATUS.PLAYING);
};

export const updateFrame = () => {
  FRAMES.set((f) => f + 1);

  // Update Scenery
  // TODO

  // Update Bird
  // BIRD.nextStateValue = updateBird(BIRD.value);
  // BIRD.ingest({ force: true });
  // TODO AgileTs is buggy, seems like it always needs a fresh object idk
  BIRD.set((b) => ({ ...updateBird(b) }), { force: true });

  // Update Pipes
  if (STATUS.value === GAME_STATUS.PLAYING) {
    PIPES.set((p) => updatePipes(p));
  }
};

export const updateBird = (bird: Bird): Bird => {
  // If Splash Screen make the Bird hover
  if (STATUS.value === GAME_STATUS.SPLASH) {
    bird.cy = height - 280 + 5 * Math.cos(FRAMES.value / 10); // ~199 - ~201
    bird.rotation = 0;
  }

  if (STATUS.value === GAME_STATUS.PLAYING) {
    bird.velocity += bird.gravity;
    bird.cy += bird.velocity;
  }

  return bird;
};

export const jumpBird = () => {
  BIRD.nextStateValue.velocity = -BIRD.value.jump;
  // BIRD.ingest({ force: true });
  BIRD.set({ ...BIRD.nextStateValue });
};

export const updatePipes = (pipes: Pipe[]) => {
  // Generate a Pipe every 100 frame
  if (FRAMES.value % 100 === 0) {
    pipes.concat(generatePipeSet());
  }

  // Calculate collision and move Pipes
  pipes.forEach((pipe) => {
    if (calculateCollision(pipe)) {
      STATUS.set(GAME_STATUS.SCORE);
    }

    // Move the Pipe towards the left
    pipe.cx -= 2;

    // If the Pipe isn't visible, remove it
    if (pipe.cx < -pipe_w) {
      pipes.splice(0, 2); // remove first 2 pipe
    }

    return pipe;
  });

  return pipes;
};

export const calculateCollision = (pipe: Pipe): boolean => {
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
  const randomYPos = height - (pipe_h + fg_h + 120 + 200 * Math.random());
  return [
    new Pipe(pipe_h, randomYPos, 'S'),
    new Pipe(pipe_h, randomYPos + 100 + pipe_h, 'N'),
  ];
};
