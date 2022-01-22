import { globalBind, shared } from '@agile-ts/core';
import reactIntegration from '@agile-ts/react';

import * as flappydronie from './entities/flappydronie';
import * as memorydronie from './entities/memorydronie';
import * as games from './entities/games';
import * as ui from './entities/ui';
import * as user from './entities/user';

shared.integrate(reactIntegration);

export const core = {
  flappydronie,
  memorydronie,
  games,
  ui,
  user,
};

// For better debugging
if (process.env.NODE_ENV !== 'production') globalBind('__core__', core);

export default core;

export { flappydronie, memorydronie, games, ui, user };
