import React from 'react';
import styled from 'styled-components';
import {
  plane,
  SpriteWrapper,
  dronies,
} from '../../../../../core/entities/flappydronie/sprites';
import { flappydronie } from '../../../../../core';

const Bird: React.FC<Props> = (props) => {
  const { sprite } = props;

  return (
    <SpriteWrapper gameSprite={sprite}>
      <HeadContainer>{dronies[sprite.skin]}</HeadContainer>
      <VehicleContainer>{plane}</VehicleContainer>
    </SpriteWrapper>
  );
};

export default Bird;

type Props = {
  sprite: flappydronie.sprites.Bird;
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
