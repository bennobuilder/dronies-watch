import React from 'react';
import { foreground_forest, SpriteWrapper } from '../../../core/sprites';
import { game } from '../../../core';

const Foreground: React.FC<Props> = (props) => {
  const { sprite } = props;
  return <SpriteWrapper gameSprite={sprite}>{foreground_forest}</SpriteWrapper>;
};

export default Foreground;

type Props = {
  sprite: game.sprites.Foreground;
};
