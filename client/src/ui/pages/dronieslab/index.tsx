import React from 'react';
import styled from 'styled-components';
import { ui } from '../../../core';
import PageLayout from '../../components/layout/PageLayout';
import Header from './components/Header';

// Assets
import HeaderBackgroundImg from '../../../assets/app/dronies_background.png';
import FlappyDronieGame from './components/FlappyDronieGame';
import Spacer from '../../components/other/Spacer';
import RecentHighScores from './components/RecentHighScores';

const FlappyDronieScreen: React.FC = () => (
  <PageLayout meta={{ title: 'Lab' }}>
    <Container>
      <Header />
      <HeaderBackground src={HeaderBackgroundImg} alt="HeaderBackground" />
      <Spacer height={200} />
      <FlappyDronieGame />
      <Spacer height={200} />
      <RecentHighScores />
      <Spacer height={200} />
    </Container>
  </PageLayout>
);

export default FlappyDronieScreen;

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin-top: ${ui.NAVBAR_HEIGHT}px;

  width: 100%;
`;

const HeaderBackground = styled.img`
  position: absolute;
  top: 300px;

  max-width: ${ui.MAX_WIDTH}px;
  width: 90vw;

  opacity: 1;
`;
