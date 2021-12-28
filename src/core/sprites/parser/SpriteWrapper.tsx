import React from 'react';
import { Base } from '../../entities/game/sprites';

const SpriteWrapper: React.FC<Props> = (props) => {
  const { gameSprite, onClickHandler, children } = props;

  const rotate = `rotate(${gameSprite.rotation}rad)`;
  const translate = `translate(${gameSprite.cx}px, ${gameSprite.cy}px)`;

  return (
    <div
      style={{
        position: 'absolute',
        transform: `${translate} ${rotate}`,
        padding: 5, // TODO REMOVE
        backgroundColor: 'red', // TODO REMOVE
      }}
      onClick={onClickHandler}
    >
      {children}
    </div>
  );
};

export default SpriteWrapper;

type Props = {
  gameSprite: Base;
  onClickHandler?: React.MouseEventHandler<HTMLDivElement>;
};
