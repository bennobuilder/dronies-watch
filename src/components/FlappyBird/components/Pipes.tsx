import React from 'react';
import { useAgile } from '@agile-ts/react';
import styled from 'styled-components';
import { pipes as _pipes } from '../../../core';

// Assets
import TopPipeImage from '../../../assets/pipe/pipe_top.png';
import BottomPipeImage from '../../../assets/pipe/pipe_bottom.png';

const Pipes: React.FC = () => {
  const [pipes, { x }] = useAgile([_pipes.PIPES, _pipes.TRANSLATION]);

  return (
    <Container>
      {pipes.map((p, i) => (
        <PipeContainer key={`pipe-${i}-${p.id}`}>
          <PipeTop x={x} i={i} topHeight={p.topHeight} />
          <PipeBottom x={x} i={i} topHeight={p.topHeight} />
        </PipeContainer>
      ))}
    </Container>
  );
};

export default Pipes;

const Container = styled.div`
  position: relative;
`;

const PipeContainer = styled.div`
  position: relative;
`;

const PipeTop = styled.div<{ x: number; i: number; topHeight: number }>`
  position: absolute;
  top: 0;
  left: ${({ x, i }) => x + i * 200};
  width: 52px;
  height: ${({ topHeight }) => topHeight}px;
  background: url(${TopPipeImage});
  background-position: bottom;
  transition: left 300ms;
`;

const PipeBottom = styled.div<{ x: number; i: number; topHeight: number }>`
  position: absolute;
  top: ${({ topHeight }) => topHeight + 100};
  left: ${({ x, i }) => x + i * 200};
  width: 52px;
  height: ${({ topHeight }) => 512 - topHeight - 100}px;
  background: url(${BottomPipeImage});
  transition: left 300ms;
`;
