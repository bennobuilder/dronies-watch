import React from 'react';
import { plane, SpriteWrapper } from '../../../core/sprites';
import { game } from '../../../core';

const Bird: React.FC<Props> = (props) => {
  const { sprite } = props;
  return <SpriteWrapper gameSprite={sprite}>{plane}</SpriteWrapper>;
};

export default Bird;

type Props = {
  sprite: game.sprites.Bird;
};
