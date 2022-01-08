import React from 'react';
import styled from 'styled-components';
import { useAgile } from '@agile-ts/react';
import { flappydronie } from '../../../../core';
import Bird from './components/sprites/Bird';
import Background from './components/sprites/Background';
import Pipe from './components/sprites/Pipe';
import Foreground from './components/sprites/Foreground';
import { useGame } from './hooks/useGame';
import { inputHandler } from './controller';
import PerformanceIndicator from './components/PerformanceIndicator';

const FlappyDronie: React.FC = () => {
  const { backgrounds, foregrounds, bird, pipeSets } = useGame();
  const [canvasDimensions] = useAgile([flappydronie.CANVAS_DIMENSIONS]);

  return (
    <Container
      id="flappydronie"
      width={canvasDimensions.width || 0}
      height={canvasDimensions.height || 0}
      onClick={inputHandler}
    >
      {backgrounds.map((bg) => (
        <Background sprite={bg} key={bg.id} />
      ))}
      {pipeSets.map((pipeSet) => (
        <div key={`${pipeSet.topPipe.id}_${pipeSet.bottomPipe.id}`}>
          <Pipe sprite={pipeSet.topPipe} key={pipeSet.topPipe.id} />
          <Pipe sprite={pipeSet.bottomPipe} key={pipeSet.bottomPipe.id} />
        </div>
      ))}
      <Bird sprite={bird} key={bird.id} />
      {foregrounds.map((fg) => (
        <Foreground sprite={fg} key={fg.id} />
      ))}
      <PerformanceIndicator />
    </Container>
  );
};

export default FlappyDronie;

const Container = styled.div<{ width: number; height: number }>`
  position: relative;
  overflow: hidden;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  background: #a79a89;
`;
