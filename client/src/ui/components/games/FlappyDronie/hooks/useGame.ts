import React from 'react';
import { useAgile } from '@agile-ts/react';
import { flappydronie, ui } from '../../../../../core';
import { useWindowSize } from '../../../../hooks/useWindowSize';

export function useGame() {
  const [backgrounds, foregrounds, bird, pipes, status] = useAgile([
    flappydronie.BACKGROUNDS,
    flappydronie.FOREGROUNDS,
    flappydronie.BIRD,
    flappydronie.PIPES,
    flappydronie.STATUS,
  ]);
  const { windowWidth } = useWindowSize();

  React.useEffect(() => {
    if (windowWidth >= flappydronie.DEFAULT_CANVAS_DIMENSIONS.width) {
      flappydronie.CANVAS_DIMENSIONS.set(
        flappydronie.DEFAULT_CANVAS_DIMENSIONS,
      );
    } else {
      flappydronie.CANVAS_DIMENSIONS.set({
        width: windowWidth - ui.INNER_PADDING * 2,
        height: flappydronie.DEFAULT_CANVAS_DIMENSIONS.height,
      });
    }
  }, [windowWidth]);

  React.useEffect(() => {
    flappydronie.FPS_CONTROLLER.startDrawing(flappydronie.updateFrame);
    return flappydronie.FPS_CONTROLLER.stopDrawing;
  }, []);

  return { backgrounds, foregrounds, bird, pipes, status };
}
