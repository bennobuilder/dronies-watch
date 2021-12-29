import React, { useEffect } from 'react';
import { useAgile } from '@agile-ts/react';
import styled from 'styled-components';
import { ui, game } from '../../core';
import Bird from './components/Bird';
import Background from './components/Background';
import Pipe from './components/Pipe';
import Foreground from './components/Foreground';
import { GAME_STATUS } from '../../core/entities/game';

const FlappyBird: React.FC = () => {
  const [backgrounds, foregrounds, bird, pipes, status] = useAgile([
    game.BACKGROUNDS,
    game.FOREGROUNDS,
    game.BIRD,
    game.PIPES,
    game.STATUS,
  ]);

  useEffect(() => {
    document.addEventListener('mousedown', () => {
      switch (game.STATUS.value) {
        case GAME_STATUS.SPLASH:
          console.log('START GAME');
          game.startGame();
          game.jumpBird();
          break;
        case GAME_STATUS.PLAYING:
          console.log('JUMP');
          game.jumpBird();
          break;
        default:
          break;
      }
    });

    const appUpdateFrame = () => {
      game.updateFrame();

      window.requestAnimationFrame(appUpdateFrame);
    };
    appUpdateFrame();
  }, []);

  return (
    <Container id="flappybird">
      {backgrounds.map((bg) => (
        <Background sprite={bg} key={bg.id} />
      ))}
      {pipes.map((pipe) => (
        <Pipe sprite={pipe} key={pipe.id} />
      ))}
      <Bird sprite={bird} />
      {foregrounds.map((fg) => (
        <Foreground sprite={fg} key={fg.id} />
      ))}
    </Container>
  );
};

export default FlappyBird;

const Container = styled.div`
  position: relative;
  overflow: hidden;
  width: ${ui.WIDTH}px;
  height: ${ui.HEIGHT}px;
`;
