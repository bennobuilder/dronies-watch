import React, { useEffect, useState } from 'react';
import {
  background_forest,
  pipe_n,
  pipe_s,
  SpriteWrapper,
} from '../../../core/sprites';
import { game } from '../../../core';

const Pipe: React.FC<Props> = (props) => {
  const { sprite } = props;
  const [pipeAsset, setPipeAsset] = useState<React.ReactElement | null>(null);

  useEffect(() => {
    switch (sprite.type) {
      default:
      case 'N':
        setPipeAsset(pipe_n);
        break;
      case 'S':
        setPipeAsset(pipe_s);
        break;
    }
  }, [sprite.type]);

  return <SpriteWrapper gameSprite={sprite}>{pipeAsset}</SpriteWrapper>;
};

export default Pipe;

type Props = {
  sprite: game.sprites.Pipe;
};
