import { shared } from '@agile-ts/core';
import reactIntegration from '@agile-ts/react';

import * as bird from './entities/bird';
import * as game from './entities/game';
import * as pipe from './entities/pipe';

shared.integrate(reactIntegration);

export const core = {
  bird,
  game,
  pipe,
};

export default core;

export { bird, game, pipe };
