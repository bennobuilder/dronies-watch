import { shared } from '@agile-ts/core';
import reactIntegration from '@agile-ts/react';

import * as flappydronie from './entities/flappydronie';
import * as ui from './entities/ui';
import * as sprites from './sprites';
import * as socket from './socket';

shared.integrate(reactIntegration);

export const core = {
  flappydronie,
  ui,
  sprites,
  socket,
};

export default core;

export { flappydronie, ui, sprites, socket };
