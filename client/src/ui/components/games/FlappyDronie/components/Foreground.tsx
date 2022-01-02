import React from 'react';
import {
  foregrounds,
  SpriteWrapper,
} from '../../../../../core/entities/flappydronie/sprites';
import { flappydronie } from '../../../../../core';

const Foreground: React.FC<Props> = (props) => {
  const { sprite } = props;
  return (
    <SpriteWrapper gameSprite={sprite} collisionBoxColor="blue">
      {foregrounds[sprite.skin]}
    </SpriteWrapper>
  );
};

export default Foreground;

type Props = {
  sprite: flappydronie.Foreground;
};
