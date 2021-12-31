import React from 'react';
import styled from 'styled-components';
import { useAgile } from '@agile-ts/react';
import FlappyDronie from './components/FlappyDronie';
import { flappydronie, ui } from '../../../core';
import PageLayout from '../../components/layout/PageLayout';
import { useWindowSize } from '../../hooks/useWindowSize';
import { useTheme } from '../../theme/useTheme';
import Header from './components/Header';
import LinesBackground from '../../components/primitive/background/LinesBackground';

// Assets
import HeaderBackgroundImg from '../../../assets/app/dronies_background.png';

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
        <Header />
        <HeaderBackground src={HeaderBackgroundImg} alt="HeaderBackground" />
        <LinesBackground linesCount={10}>
          <FlappyDronie />
        </LinesBackground>
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
  margin-top: ${ui.NAVBAR_HEIGHT}px;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
`;

const HeaderBackground = styled.img`
  position: absolute;
  top: 300px;

  max-width: ${ui.MAX_WIDTH}px;
  width: 90vw;

  opacity: 1;
`;
