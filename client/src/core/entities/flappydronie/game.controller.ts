import { createState } from '@agile-ts/core';
import { bird_h, bird_w } from './sprites';
import { Bird, Game, PipeSet } from './elements';
import { FpsController, Performance } from './utils/FpsController';
import { BackgroundWrapper } from './elements/scenary/BackgroundWrapper';
import { ForegroundWrapper } from './elements/scenary/ForegroundWrapper';
import { GAME_STATUS } from './game.types';

// Configuration
export const DEFAULT_CANVAS_DIMENSIONS = { width: 320, height: 480 };
export const DEFAULT_BIRD_POSITION = { x: 60, y: 0 };
export const PLAY_ONLINE = createState(false);
export const SHOW_COLLIDERS = createState(false).persist({
  key: 'sho-colliders',
});
export const SHOW_PERFORMANCE = createState(false).persist({
  key: 'show-performance',
});
export const BIRD_SKIN = createState(Math.floor(Math.random() * 20) + 1); // +1 because the first Bird sprite is a test asset
BIRD_SKIN.watch((v) => {
  BIRD.nextStateValue.skin = v;

  // Apply changes to the UI
  BIRD.ingest();
});
export const MAP_SKIN = createState(0);
MAP_SKIN.watch((v) => {
  const { foregrounds } = FOREGROUND_WRAPPER.nextStateValue;
  const { backgrounds } = BACKGROUND_WRAPPER.nextStateValue;

  foregrounds.forEach((fg) => {
    fg.skin = v;
  });
  backgrounds.forEach((bg) => {
    bg.skin = v;
  });

  // Apply changes to the UI
  FOREGROUND_WRAPPER.ingest();
  BACKGROUND_WRAPPER.ingest();
});
export const VEHICLE_SKIN = createState(0);

// Game
export const GAME = new Game(DEFAULT_CANVAS_DIMENSIONS);
export const FPS_CONTROLLER = new FpsController(60, (performance) =>
  PERFORMANCE.set(performance),
);
export const PERFORMANCE = createState<Performance>({
  elapsed: 0,
  offset: 0,
  lag: 0,
  fps: 0,
});

// Game Properties
export const STATUS = createState<GAME_STATUS>(GAME_STATUS.SPLASH);
export const SCORE = createState(0);
export const LATEST_SCORE = createState(0).persist({ key: 'latest-score' });
export const HIGH_SCORE = createState(0).persist({ key: 'high-score' });
export const COOLDOWN = createState(false);

// Game Objects
export const PIPE_SETS = createState<PipeSet[]>([]);
export const BIRD = createState<Bird>(
  new Bird(GAME, {
    cx: DEFAULT_BIRD_POSITION.x,
    cy: DEFAULT_BIRD_POSITION.y,
    collisionBox: {
      width: bird_w - 10,
      height: bird_h - 10,
      offset: { x: 10, y: 5 },
    },
    skin: BIRD_SKIN.value,
    renderCallback: () => {
      BIRD.ingest({ force: true }); // Force render
    },
  }),
);
export const BACKGROUND_WRAPPER = createState(
  new BackgroundWrapper(GAME, {
    vx: 0.5,
    renderCallback: () => {
      BACKGROUND_WRAPPER.ingest({ force: true }); // Force render
    },
  }),
);
export const FOREGROUND_WRAPPER = createState(
  new ForegroundWrapper(GAME, {
    vx: 2,
    renderCallback: () => {
      FOREGROUND_WRAPPER.ingest({ force: true }); // Force render
    },
  }),
);
