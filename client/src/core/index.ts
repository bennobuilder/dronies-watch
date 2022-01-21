import { globalBind, shared } from '@agile-ts/core';
import reactIntegration from '@agile-ts/react';

import * as flappydronie from './entities/flappydronie';
import * as memory from './entities/memory';
import * as ui from './entities/ui';
import * as user from './entities/user';

shared.integrate(reactIntegration);

export const core = {
  flappydronie,
  memory,
  ui,
  user,
};

// For better debugging
if (process.env.NODE_ENV !== 'production') globalBind('__core__', core);

export default core;

export { flappydronie, memory, ui, user };
