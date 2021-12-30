import React from 'react';
import { backgrounds, SpriteWrapper } from '../../../../../../core/sprites';
import { flappydronie } from '../../../../../../core';

const Background: React.FC<Props> = (props) => {
  const { sprite } = props;
  return (
    <SpriteWrapper gameSprite={sprite}>
      {backgrounds[sprite.skin]}
    </SpriteWrapper>
  );
};

export default Background;

type Props = {
  sprite: flappydronie.sprites.Background;
};
