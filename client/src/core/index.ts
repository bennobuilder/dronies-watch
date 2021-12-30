import { shared } from '@agile-ts/core';
import reactIntegration from '@agile-ts/react';

import * as game from './entities/game';
import * as ui from './entities/ui';
import * as sprites from './sprites';
import * as socket from './socket';

shared.integrate(reactIntegration);

export const core = {
  game,
  ui,
  sprites,
  socket,
};

export default core;

export { game, ui, sprites, socket };
