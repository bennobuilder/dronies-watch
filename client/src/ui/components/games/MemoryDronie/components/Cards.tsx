import React from 'react';
import styled from 'styled-components';

// Assets
import BackImg from '../../../../../assets/games/memory/back.png';
import { CardMeta } from '../../../../../core/entities/memorydronie';

const Card: React.FC<Props> = (props) => {
  const {
    onClick,
    card,
    index,
    isInactive,
    isFlipped,
    isDisabled,
    dimensions = { width: 92.5, height: 130 },
  } = props;

  const handleClick = () => {
    if (!isFlipped && !isDisabled) onClick(index);
  };

  return (
    <Container
      isInactive={isInactive}
      isFlipped={isFlipped}
      onClick={handleClick}
      width={dimensions.width}
      height={dimensions.height}
    >
      <CardFace isBack={false}>
        <img
          src={BackImg}
          width={dimensions.width}
          height={dimensions.height}
          alt="back"
        />
      </CardFace>
      <CardFace isBack>
        <img
          src={card.image}
          width={dimensions.width}
          height={dimensions.height}
          alt="front"
        />
      </CardFace>
    </Container>
  );
};

export default Card;

type Props = {
  onClick: (index: number) => void;
  card: CardMeta;
  index: number;
  isInactive: boolean;
  isFlipped: boolean;
  isDisabled: boolean;
  dimensions?: { width: number; height: number };
};

const Container = styled.div<{
  isFlipped: boolean;
  isInactive: boolean;
  width: number;
  height: number;
}>`
  position: relative;

  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;

  transform-style: preserve-3d;
  cursor: pointer;

  transition: 0.3s;

  ${({ isFlipped }) => (isFlipped ? `transform: rotateY(180deg);` : '')}
  ${({ isInactive }) => (isInactive ? `opacity: 0;` : '')}
`;

const CardFace = styled.div<{ isBack: boolean }>`
  backface-visibility: hidden;
  position: absolute;
  width: 100%;
  height: 100%;

  ${({ isBack }) => (isBack ? `transform: rotateY(180deg);` : '')}
`;
