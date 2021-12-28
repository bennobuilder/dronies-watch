import React from 'react';
import { useAgile } from '@agile-ts/react';
import styled from 'styled-components';
import { game } from '../../core';
import { flap, resetGame, startGame } from './controller';
import { GAME_STATUS } from '../../core/entities/game';

import Bird from './components/Bird';
import Pipes from './components/Pipes';
import Foreground from './components/Foreground';

// Assets
import BackgroundImage from '../../assets/map/bg_Forest.png';

const FlappyBird: React.FC = () => {
  const [status] = useAgile([game.STATUS]);

  React.useEffect(() => {
    document.addEventListener('keypress', (e) => {
      if (e.keyCode === 32) {
        flap();
      }

      if (status !== GAME_STATUS.PLAYING) {
        startGame();
      }
    });

    return () => {
      resetGame();
    };
  }, []);

  return (
    <Container>
      <Bird />
      <Pipes />
      <Foreground />
    </Container>
  );
};

export default FlappyBird;

const Container = styled.div`
  position: relative;
  width: 288px;
  height: 512px;
  background: url(${BackgroundImage});
  overflow: hidden;
`;
