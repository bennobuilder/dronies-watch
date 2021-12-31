import React from 'react';
import { useAgile } from '@agile-ts/react';
import { flappydronie } from '../../../../../core';
import { useWindowSize } from '../../../../hooks/useWindowSize';

const useGame = () => {
  const [backgrounds, foregrounds, bird, pipes, status] = useAgile([
    flappydronie.BACKGROUNDS,
    flappydronie.FOREGROUNDS,
    flappydronie.BIRD,
    flappydronie.PIPES,
    flappydronie.STATUS,
  ]);
  const { windowWidth, windowHeight } = useWindowSize();

  React.useEffect(() => {
    if (windowWidth >= 500) {
      flappydronie.CANVAS_DIMENSIONS.set({ width: 320, height: 480 });
    } else {
      flappydronie.CANVAS_DIMENSIONS.set({
        width: windowWidth,
        height: windowHeight,
      });
    }
  }, [windowHeight, windowWidth]);

  React.useEffect(() => {
    flappydronie.FPS_CONTROLLER.startDrawing(flappydronie.updateFrame);
    return flappydronie.FPS_CONTROLLER.stopDrawing;
  }, []);

  return { backgrounds, foregrounds, bird, pipes, status };
};

export default useGame;
