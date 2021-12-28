import { shared } from '@agile-ts/core';
import reactIntegration from '@agile-ts/react';

import * as game from './entities/game';
import * as device from './entities/device';
import * as sprites from './sprites';

shared.integrate(reactIntegration);

export const core = {
  game,
  device,
  sprites,
};

export default core;

export { game, device, sprites };
