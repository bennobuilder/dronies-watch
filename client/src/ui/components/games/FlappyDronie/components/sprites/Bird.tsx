import React from 'react';
import styled from 'styled-components';
import { useAgile } from '@agile-ts/react';
import {
  plane,
  SpriteWrapper,
  dronies,
} from '../../../../../../core/entities/flappydronie/sprites';
import { flappydronie } from '../../../../../../core';
import { SHOW_COLLIDER } from '../../../../../../core/entities/flappydronie';

const Bird: React.FC<Props> = (props) => {
  const { sprite } = props;
  const showCollider = useAgile(SHOW_COLLIDER);

  return (
    <SpriteWrapper
      gameSprite={sprite}
      collisionBoxColor={showCollider ? 'purple' : undefined}
    >
      <HeadContainer>{dronies[sprite.skin]}</HeadContainer>
      <VehicleContainer>{plane}</VehicleContainer>
    </SpriteWrapper>
  );
};

export default Bird;

type Props = {
  sprite: flappydronie.Bird;
};

const VehicleContainer = styled.div`
  z-index: 1;
`;

const HeadContainer = styled.div`
  position: absolute;
  top: -10px;
  left: 20px;
  z-index: 2;
`;
