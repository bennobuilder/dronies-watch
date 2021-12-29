import React from 'react';
import styled from 'styled-components';
import { useAgile } from '@agile-ts/react';
import Game from './components/Game';
import { game, ui } from '../../../core';

const FlappyDronieScreen: React.FC = () => {
  const [score, highScore] = useAgile([game.SCORE, game.HIGH_SCORE]);

  return (
    <Container>
      <Game />
      <ScoreContainer>
        <div>Score: {score}</div>
        <div>High Score: {highScore}</div>
      </ScoreContainer>
    </Container>
  );
};

export default FlappyDronieScreen;

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ScoreContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  width: ${ui.WIDTH}px;
`;
