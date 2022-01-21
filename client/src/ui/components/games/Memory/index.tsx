import React from 'react';
import styled from 'styled-components';
import { useAgile } from '@agile-ts/react';
import { memory } from '../../../../core';
import Card from './components/Cards';

const Memory: React.FC = () => {
  const [cards, shouldDisableAllCards] = useAgile([
    memory.CARDS,
    memory.DISABLE_ALL_CARDS,
    memory.OPEN_CARDS,
    memory.CLEARED_CARDS,
  ]);

  React.useEffect(() => {
    memory.resetGame();
  }, []);

  return (
    <Container>
      {cards.map((card, index) => (
        <Card
          key={index}
          card={card}
          index={index}
          isDisabled={shouldDisableAllCards}
          isInactive={memory.isInactive(card)}
          isFlipped={memory.isFlipped(index)}
          onClick={memory.flipCard}
        />
      ))}
    </Container>
  );
};

export default Memory;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 1rem;
`;
