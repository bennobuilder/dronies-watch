import React from 'react';
import styled from 'styled-components';
import { Base } from '../../elements';

const SpriteWrapper: React.FC<Props> = (props) => {
  const { gameSprite, onClickHandler, collisionBoxColor, children } = props;

  const rotate = `rotate(${gameSprite.rotation}rad)`;
  const translate = `translate(${gameSprite.rx}px, ${gameSprite.ry}px)`;

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
          width={gameSprite.collisionBox.width}
          height={gameSprite.collisionBox.height}
          offset={gameSprite.collisionBox.offset}
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
  offset: { x: number; y: number };
  color: string;
}>`
  position: absolute;
  bottom: ${({ offset }) => offset.y}px;
  left: ${({ offset }) => offset.x}px;

  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;

  background-color: ${({ color }) => color};
  opacity: 0.5;
`;
