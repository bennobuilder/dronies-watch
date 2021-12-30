import React from 'react';
import { foregrounds, SpriteWrapper } from '../../../../../../core/sprites';
import { flappydronie } from '../../../../../../core';

const Foreground: React.FC<Props> = (props) => {
  const { sprite } = props;
  return (
    <SpriteWrapper gameSprite={sprite}>
      {foregrounds[sprite.skin]}
    </SpriteWrapper>
  );
};

export default Foreground;

type Props = {
  sprite: flappydronie.sprites.Foreground;
};
