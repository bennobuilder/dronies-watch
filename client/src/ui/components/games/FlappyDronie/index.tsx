import React from 'react';
import styled from 'styled-components';
import { useHotkeys } from 'react-hotkeys-hook';
import { useAgile } from '@agile-ts/react';
import { flappydronie } from '../../../../core';
import Bird from './components/sprites/Bird';
import Background from './components/sprites/Background';
import Pipe from './components/sprites/Pipe';
import Foreground from './components/sprites/Foreground';
import { useGame } from './hooks/useGame';
import { inputHandler, toggledDeveloperMode } from './controller';
import PerformanceIndicator from './components/PerformanceIndicator';
import { MAP_SKIN } from '../../../../core/entities/flappydronie';

const FlappyDronie: React.FC = () => {
  const { backgrounds, foregrounds, bird, pipeSets } = useGame();
  const showPerformance = useAgile(flappydronie.SHOW_PERFORMANCE);
  useHotkeys('d', toggledDeveloperMode);
  useHotkeys('m', () => {
    MAP_SKIN.set(MAP_SKIN.value === 1 ? 0 : 1);
  });

  // https://stackoverflow.com/questions/45612379/react-onclick-and-ontouchstart-fired-simultaneously
  const prevent = React.useRef(false);

  return (
    <Container
      id="flappydronie"
      width={flappydronie.GAME.canvasDimensions.width}
      height={flappydronie.GAME.canvasDimensions.height}
      onMouseDown={(e) => {
        if (!prevent.current) {
          inputHandler();
        } else {
          prevent.current = false;
        }
      }}
      onTouchStart={(e) => {
        prevent.current = true;
        inputHandler();
      }}
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
      {showPerformance && <PerformanceIndicator />}
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
