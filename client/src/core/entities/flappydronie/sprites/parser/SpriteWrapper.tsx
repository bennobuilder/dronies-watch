import React from 'react';
import { Base } from '../logic';

const SpriteWrapper: React.FC<Props> = (props) => {
  const { gameSprite, onClickHandler, children } = props;

  const rotate = `rotate(${gameSprite.rotation}rad)`;
  const translate = `translate(${gameSprite.cx}px, ${gameSprite.cy}px)`;

  return (
    <div
      style={{
        position: 'absolute',
        transform: `${translate} ${rotate}`,
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
