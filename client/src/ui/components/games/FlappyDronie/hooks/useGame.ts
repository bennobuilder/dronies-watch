import React from 'react';
import { useAgile } from '@agile-ts/react';
import { flappydronie, ui } from '../../../../../core';
import { useWindowSize } from '../../../../hooks/useWindowSize';
import { DEFAULT_CANVAS_DIMENSIONS } from '../../../../../core/entities/flappydronie';

export function useGame() {
  const [backgroundWrapper, foregroundWrapper, bird, pipeSets, status] =
    useAgile([
      flappydronie.BACKGROUND_WRAPPER,
      flappydronie.FOREGROUND_WRAPPER,
      flappydronie.BIRD,
      flappydronie.PIPE_SETS,
      flappydronie.STATUS,
    ]);
  const { windowWidth } = useWindowSize();

  // Update Canvas dimensions
  React.useEffect(() => {
    if (
      windowWidth == null ||
      windowWidth >= flappydronie.DEFAULT_CANVAS_DIMENSIONS.width
    ) {
      flappydronie.GAME.canvasDimensions = DEFAULT_CANVAS_DIMENSIONS;
    } else {
      flappydronie.GAME.canvasDimensions = {
        width: windowWidth - ui.INNER_PADDING * 2,
        height: flappydronie.DEFAULT_CANVAS_DIMENSIONS.height,
      };
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
    backgrounds: backgroundWrapper.backgrounds,
    foregrounds: foregroundWrapper.foregrounds,
    bird,
    pipeSets,
    status,
  };
}
