import React from 'react';
import styled from 'styled-components';
import Game from './components/Game';

const FlappyDronieScreen: React.FC = () => (
  <Container>
    <Game />
  </Container>
);

export default FlappyDronieScreen;

const Container = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;
