import React from 'react';
import { useSpring } from 'react-spring';
import { useWindowSize } from '../../../../../hooks/useWindowSize';

export const useBirdAnimation = () => {
  const { windowWidth, windowHeight } = useWindowSize();
  const [isHovering, setIsHovering] = React.useState(true);

  // const birdAnimation = useSpring({
  //   loop: true, // https://github.com/pmndrs/react-spring/issues/982
  //   from: { x: 0 },
  //   to: { x: 2 * Math.PI },
  //   config: { duration: 3500 },
  // });
  // ===
  const birdAnimation = useSpring({
    to: async (next) => {
      if (isHovering) {
        while (isHovering) {
          await next({
            x: 0,
            y: 2 * Math.PI,
            r: 0,
            reset: true, // https://spectrum.chat/react-spring/general/single-animation-that-repeats-forever-continuous~81097bce-a7fe-4f1b-9c77-d13f5d9813d1
            config: { duration: 3500 },
          });
        }
      } else {
        await next({
          x: -windowWidth,
          y: -windowHeight,
          r: 45,
          // duration = distance / speed
          config: { duration: Math.hypot(windowWidth, windowHeight) / 1.5 },
        });
        await next({
          x: windowWidth * 2,
          y: -windowHeight,
          config: { duration: 100 },
        });
        await next({
          x: 0,
          y: 15 * Math.sin((2 * Math.PI) / 1.6),
          r: 0,
          config: { duration: 5000 },
          onRest: () => {
            setIsHovering(true);
          },
        });
      }
    },
    from: { x: 0, y: 0, r: 0 },
  });

  return { isHovering, setIsHovering, birdAnimation };
};
