import React from 'react';
import { background_forest, SpriteWrapper } from '../../../core/sprites';
import { game } from '../../../core';

const Background: React.FC<Props> = (props) => {
  const { sprite } = props;
  return <SpriteWrapper gameSprite={sprite}>{background_forest}</SpriteWrapper>;
};

export default Background;

type Props = {
  sprite: game.sprites.Background;
};
