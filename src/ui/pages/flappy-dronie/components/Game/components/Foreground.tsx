import React from 'react';
import { foregrounds, SpriteWrapper } from '../../../../../../core/sprites';
import { game } from '../../../../../../core';

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
  sprite: game.sprites.Foreground;
};
