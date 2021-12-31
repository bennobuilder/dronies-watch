import React from 'react';
import { useAgile } from '@agile-ts/react';
import { flappydronie } from '../../../../../../core';
import { CANVAS_DIMENSIONS } from '../../../../../../core/entities/flappydronie';
import { useWindowSize } from '../../../../../hooks/useWindowSize';

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
      CANVAS_DIMENSIONS.set({ width: 320, height: 480 });
    } else {
      CANVAS_DIMENSIONS.set({ width: windowWidth, height: windowHeight });
    }
  }, [windowHeight, windowWidth]);

  React.useEffect(() => {
    // Dynamically update Game and thus render it
    const updateFrame = () => {
      flappydronie.updateFrame();
      window.requestAnimationFrame(updateFrame);
    };
    updateFrame();
  }, []);

  return { backgrounds, foregrounds, bird, pipes, status };
};

export default useGame;
