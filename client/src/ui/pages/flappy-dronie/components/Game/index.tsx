import React from 'react';
import styled from 'styled-components';
import { socket, ui } from '../../../../../core';
import Bird from './components/Bird';
import Background from './components/Background';
import Pipe from './components/Pipe';
import Foreground from './components/Foreground';
import useGame from './hooks/useGame';

const FlappyBird: React.FC = () => {
  const { backgrounds, foregrounds, bird, pipes, status } = useGame();

  React.useEffect(() => {
    const connectSocket = async () => {
      await socket.socketService
        .connect('http://localhost:9000')
        .catch((err) => {
          console.log('Error: ', err);
        });
    };
    connectSocket();
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
  background: #a79a89;
`;
