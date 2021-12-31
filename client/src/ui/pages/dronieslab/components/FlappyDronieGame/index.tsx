import React from 'react';
import styled from 'styled-components';
import { useAgile } from '@agile-ts/react';
import { flappydronie, ui } from '../../../../../core';
import LinesBackground from '../../../../components/primitive/background/LinesBackground';
import FlappyDronie from '../../../../components/games/FlappyDronie';
import { useTheme } from '../../../../theme/useTheme';

const FlappyDronieGame: React.FC = () => {
  const [score, highScore] = useAgile([
    flappydronie.SCORE,
    flappydronie.HIGH_SCORE,
  ]);
  const theme = useTheme();

  return (
    <Container>
      <HeaderContainer>
        <Title>Start Training!</Title>
        <Subtitle>With Flappy Dronie</Subtitle>
      </HeaderContainer>

      <GameContainer>
        <p style={{ color: theme.colors.layout.hc }}>Score: {score}</p>
        <p style={{ color: theme.colors.layout.hc }}>HighScore: {highScore}</p>

        <Game linesCount={20}>
          <FlappyDronie />
        </Game>
      </GameContainer>
    </Container>
  );
};

export default FlappyDronieGame;

const Container = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  width: 100%;
`;

const HeaderContainer = styled.div`
  align-self: flex-start;
`;

const Title = styled.h1`
  margin: 0 0 10px 0;

  color: ${({ theme }) => theme.colors.layout.p};
  font-size: 4rem;
  font-family: ${({ theme }) => theme.headings.fontFamily};
  white-space: nowrap;
  text-transform: uppercase;

  text-shadow: 0 0 50px
    ${({ theme }) => ui.hexToRgba(theme.colors.layout.p, 0.5)};

  @media (max-width: ${ui.BREAK_POINTS[0]}px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.h3`
  margin: 0;

  color: ${({ theme }) => theme.colors.interactive.primary.p0};
  font-size: 1.5rem;
  font-family: ${({ theme }) => theme.fontFamily};
  white-space: nowrap;
  text-transform: uppercase;

  @media (max-width: ${ui.BREAK_POINTS[0]}px) {
    font-size: 1rem;
  }
`;

const GameContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  width: 100%;

  margin-top: 50px;
`;

const Game = styled(LinesBackground)`
  justify-self: flex-end;
`;
