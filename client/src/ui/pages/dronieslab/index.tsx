import React from 'react';
import styled from 'styled-components';
import { useAgile } from '@agile-ts/react';
import FlappyDronie from './components/FlappyDronie';
import { flappydronie } from '../../../core';
import PageLayout from '../../components/layout/PageLayout';
import { useWindowSize } from '../../hooks/useWindowSize';
import { useTheme } from '../../theme/useTheme';

const FlappyDronieScreen: React.FC = () => {
  const [score, highScore] = useAgile([
    flappydronie.SCORE,
    flappydronie.HIGH_SCORE,
  ]);
  const { windowWidth } = useWindowSize();
  const theme = useTheme();

  // Mobile
  if (windowWidth <= 500) {
    return <FlappyDronie />;
  }

  // Desktop
  return (
    <PageLayout>
      <Container>
        <FlappyDronie />
        <p style={{ color: theme.colors.layout.hc }}>Score: {score}</p>
        <p style={{ color: theme.colors.layout.hc }}>HighScore: {highScore}</p>
      </Container>
    </PageLayout>
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
