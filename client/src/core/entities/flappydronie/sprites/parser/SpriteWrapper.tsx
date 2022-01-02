import React from 'react';
import styled from 'styled-components';
import { Base } from '../../elements';

const SpriteWrapper: React.FC<Props> = (props) => {
  const { gameSprite, onClickHandler, collisionBoxColor, children } = props;

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
      {collisionBoxColor != null && (
        <CollisionBox
          width={gameSprite.width}
          height={gameSprite.height}
          color={collisionBoxColor}
        />
      )}
      {children}
    </div>
  );
};

export default SpriteWrapper;

type Props = {
  gameSprite: Base;
  collisionBoxColor?: string;
  onClickHandler?: React.MouseEventHandler<HTMLDivElement>;
};

const CollisionBox = styled.div<{
  width: number;
  height: number;
  color: string;
}>`
  position: absolute;

  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;

  background-color: ${({ color }) => color};
  opacity: 0.5;
`;
