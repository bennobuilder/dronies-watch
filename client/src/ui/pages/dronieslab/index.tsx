import React from 'react';
import styled from 'styled-components';
import { useAgile } from '@agile-ts/react';
import FlappyDronie from './components/FlappyDronie';
import { flappydronie, ui } from '../../../core';

const FlappyDronieScreen: React.FC = () => {
  const [score, highScore] = useAgile([
    flappydronie.SCORE,
    flappydronie.HIGH_SCORE,
  ]);

  return (
    <Container>
      <FlappyDronie />
      <TextContainer>
        <ScoreContainer>
          <div>Score: {score}</div>
          <div>High Score: {highScore}</div>
        </ScoreContainer>
        <a href="https://github.com/bennodev19/dronies-watch">Github</a>
      </TextContainer>
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

const TextContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  width: ${ui.WIDTH}px;
`;

const ScoreContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
`;
