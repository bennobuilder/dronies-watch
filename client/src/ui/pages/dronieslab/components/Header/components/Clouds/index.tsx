import React from 'react';
import styled from 'styled-components';
import { useWindowSize } from '../../../../../../hooks/useWindowSize';
import { useTheme } from '../../../../../../theme/useTheme';
import Cloud from '../../../../../../components/icons/components/Cloud';
import { MAX_WIDTH } from '../../../../../../../core/entities/ui';
import { ui } from '../../../../../../../core';

const Clouds: React.FC = () => {
  const [cloudsMeta] = React.useState<CloudMeta[]>([
    { width: 300, speed: 2, bottomOffset: 0, delay: 0 },
    { width: 400, speed: 1, bottomOffset: 50, delay: 12 },
    { width: 130, speed: 3, bottomOffset: 120, delay: 60 },
    { width: 250, speed: 3.5, bottomOffset: 200, delay: 50 },
    { width: 350, speed: 1, bottomOffset: 150, delay: 30 },
    { width: 150, speed: 2, bottomOffset: 300, delay: 20 },
    { width: 200, speed: 3, bottomOffset: 400, delay: 2 },
    { width: 120, speed: 3, bottomOffset: 10, delay: 80 },
  ]);

  const { windowWidth } = useWindowSize();
  const theme = useTheme();

  return (
    <>
      {cloudsMeta.map((cloud) => (
        <StyledCloud
          width={cloud.width}
          windowWidth={windowWidth}
          cloudWidth={cloud.width}
          speed={cloud.speed}
          bottomOffset={cloud.bottomOffset}
          delay={cloud.delay}
          color={theme.colors.layout.p}
        />
      ))}
    </>
  );
};

type CloudMeta = {
  width: number;
  speed: number;
  bottomOffset: number;
  delay: number;
};

export default Clouds;

const StyledCloud = styled(Cloud)<{
  windowWidth: number;
  cloudWidth: number;
  speed: number;
  bottomOffset: number;
  delay: number;
}>`
  position: absolute;
  right: 0;
  left: 0;
  bottom: ${({ bottomOffset }) => bottomOffset}px;

  z-index: 0;
  opacity: 0;

  animation: movement ${({ speed }) => 40 - speed}s forwards linear infinite;
  animation-delay: ${({ delay }) =>
    -delay}s; // https://stackoverflow.com/questions/10540720/how-can-i-start-css3-animations-at-a-specific-spot

  @keyframes movement {
    0% {
      opacity: 0;

      transform: translateX(
        ${({ cloudWidth, windowWidth }) =>
          windowWidth > MAX_WIDTH
            ? -cloudWidth - (windowWidth - MAX_WIDTH) / 2
            : -cloudWidth}px
      );
    }
    10% {
      opacity: 0.2;
    }
    90% {
      opacity: 0;
    }
    100% {
      opacity: 0;
      transform: translateX(
        2000px
      ); // Static value for consistent speed over different screen sizes
    }
  }

  @media (max-width: ${ui.WIDTH_BREAK_POINTS[1]}px) {
    bottom: ${({ bottomOffset }) => bottomOffset - 200}px;
  }
`;
