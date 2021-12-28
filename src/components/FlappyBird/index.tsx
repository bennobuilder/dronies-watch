import React from 'react';
import { useAgile } from '@agile-ts/react';
import styled from 'styled-components';
import { device, game } from '../../core';
import Bird from './components/Bird';
import Background from './components/Background';
import Pipe from './components/Pipe';
import Foreground from './components/Foreground';

const FlappyBird: React.FC = () => {
  const [backgrounds, foregrounds, bird, pipes] = useAgile([
    game.BACKGROUNDS,
    game.FOREGROUNDS,
    game.BIRD,
    game.PIPES,
  ]);

  return (
    <Container>
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
  width: ${device.width};
  height: ${device.height};
`;
