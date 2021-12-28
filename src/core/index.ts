import { shared } from '@agile-ts/core';
import reactIntegration from '@agile-ts/react';

import * as bird from './entities/bird';
import * as game from './entities/game';
import * as pipes from './entities/pipes';

shared.integrate(reactIntegration);

export const core = {
  bird,
  game,
  pipes,
};

export default core;

export { bird, game, pipes };
