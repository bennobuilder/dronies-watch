import React from 'react';
import { plane, SpriteWrapper, dronies } from '../../../../../../core/sprites';
import { game } from '../../../../../../core';

const Bird: React.FC<Props> = (props) => {
  const { sprite } = props;

  return (
    <SpriteWrapper gameSprite={sprite}>
      <div style={{ position: 'absolute', top: -10, left: 20, zIndex: -1 }}>
        {dronies[sprite.skin]}
      </div>
      {plane}
    </SpriteWrapper>
  );
};

export default Bird;

type Props = {
  sprite: game.sprites.Bird;
};
