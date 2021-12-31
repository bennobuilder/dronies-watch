import React from 'react';
import styled from 'styled-components';
import { useAgile } from '@agile-ts/react';
import FlappyDronie from './components/FlappyDronie';
import { flappydronie, ui } from '../../../core';
import { useTheme } from '../../theme/useTheme';
import PageLayout from '../../components/layout/PageLayout';
import Icon from '../../components/icons';
import { Button } from '../../components/primitive';
import { useWindowSize } from '../../hooks/useWindowSize';

const FlappyDronieScreen: React.FC = () => {
  const [score, highScore] = useAgile([
    flappydronie.SCORE,
    flappydronie.HIGH_SCORE,
  ]);
  const theme = useTheme();
  const { windowWidth } = useWindowSize();

  // Mobile
  if (windowWidth <= 500) {
    return <FlappyDronie />;
  }

  // Desktop
  return (
    <PageLayout>
      <Container>
        <FlappyDronie />
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
