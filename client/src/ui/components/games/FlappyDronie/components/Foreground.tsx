import React from 'react';
import { useAgile } from '@agile-ts/react';
import {
  foregrounds,
  SpriteWrapper,
} from '../../../../../core/entities/flappydronie/sprites';
import { flappydronie } from '../../../../../core';
import { SHOW_COLLIDER } from '../../../../../core/entities/flappydronie';

const Foreground: React.FC<Props> = (props) => {
  const { sprite } = props;
  const showCollider = useAgile(SHOW_COLLIDER);

  return (
    <SpriteWrapper
      gameSprite={sprite}
      collisionBoxColor={showCollider ? 'blue' : undefined}
    >
      {foregrounds[sprite.skin]}
    </SpriteWrapper>
  );
};

export default Foreground;

type Props = {
  sprite: flappydronie.Foreground;
};
