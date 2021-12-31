import React from 'react';
import styled from 'styled-components';
import { useAgile } from '@agile-ts/react';
import { flappydronie, ui } from '../../../core';
import PageLayout from '../../components/layout/PageLayout';
import { useWindowSize } from '../../hooks/useWindowSize';
import { useTheme } from '../../theme/useTheme';
import Header from './components/Header';
import FlappyDronie from '../../components/games/FlappyDronie';

// Assets
import HeaderBackgroundImg from '../../../assets/app/dronies_background.png';
import FlappyDronieGame from './components/FlappyDronieGame';
import Spacer from '../../components/other/Spacer';

const FlappyDronieScreen: React.FC = () => {
  const { windowWidth } = useWindowSize();

  // Mobile
  if (windowWidth <= 500) {
    return <FlappyDronie />;
  }

  // Desktop
  return (
    <PageLayout meta={{ title: 'Lab' }}>
      <Container>
        <Header />
        <HeaderBackground src={HeaderBackgroundImg} alt="HeaderBackground" />
        <Spacer height={200} />
        <FlappyDronieGame />
        <Spacer height={200} />
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
