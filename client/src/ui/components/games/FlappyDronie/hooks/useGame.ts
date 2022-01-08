import React from 'react';
import { useAgile } from '@agile-ts/react';
import { flappydronie, ui } from '../../../../../core';
import { useWindowSize } from '../../../../hooks/useWindowSize';

export function useGame() {
  const [background, foreground, bird, pipeSets, status] = useAgile([
    flappydronie.BACKGROUND_WRAPPER,
    flappydronie.FOREGROUND_WRAPPER,
    flappydronie.BIRD,
    flappydronie.PIPE_SETS,
    flappydronie.STATUS,
  ]);
  const { windowWidth } = useWindowSize();

  // Update Canvas dimensions
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
    flappydronie.FPS_CONTROLLER.startDrawing(
      flappydronie.updateFrame,
      flappydronie.renderFrame,
    );
    return flappydronie.FPS_CONTROLLER.stopDrawing;
  }, []);

  return {
    backgrounds: background.backgrounds,
    foregrounds: foreground.foregrounds,
    bird,
    pipeSets,
    status,
  };
}
