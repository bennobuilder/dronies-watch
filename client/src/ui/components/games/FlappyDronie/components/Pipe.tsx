import React, { useEffect, useState } from 'react';
import { useAgile } from '@agile-ts/react';
import {
  pipe_n,
  pipe_s,
  SpriteWrapper,
} from '../../../../../core/entities/flappydronie/sprites';
import { flappydronie } from '../../../../../core';
import { SHOW_COLLIDER } from '../../../../../core/entities/flappydronie';

const Pipe: React.FC<Props> = (props) => {
  const { sprite } = props;
  const [pipeAsset, setPipeAsset] = useState<React.ReactElement | null>(null);
  const showCollider = useAgile(SHOW_COLLIDER);

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

  return (
    <SpriteWrapper
      gameSprite={sprite}
      collisionBoxColor={showCollider ? 'red' : undefined}
    >
      {pipeAsset}
    </SpriteWrapper>
  );
};

export default Pipe;

type Props = {
  sprite: flappydronie.Pipe;
};
