import React from 'react';
import { animated, to } from 'react-spring';
import styled from 'styled-components';
import { useBirdAnimation } from './hooks/useBirdAnimation';
import { useWindowSize } from '../../../../../../hooks/useWindowSize';
import { ui } from '../../../../../../../core';

// Assets
import BirdInPlaneImg from '../../../../../../../assets/app/bird_in_plane.png';

const BirdInPlane: React.FC = () => {
  const { isHovering, setIsHovering, birdAnimation } = useBirdAnimation();
  const { windowWidth } = useWindowSize();

  return (
    <Container
      src={BirdInPlaneImg}
      loading="lazy"
      alt="TrainingProtocolImg"
      onClick={() => {
        if (windowWidth > ui.WIDTH_BREAK_POINTS[1]) setIsHovering(false);
      }}
      style={{
        transform: to(
          [birdAnimation.x, birdAnimation.y, birdAnimation.r],
          (x, y, r) =>
            `translate3d(${x}px, ${
              isHovering ? 15 * Math.sin(y + (2 * Math.PI) / 1.6) : y
            }px, 0) rotateZ(${r}deg)`,
        ),
      }}
    />
  );
};

export default BirdInPlane;

const Container = styled(animated.img)`
  z-index: 100;

  @media (max-width: ${ui.WIDTH_BREAK_POINTS[1]}px) {
    margin-top: 100px;
  }
`;
