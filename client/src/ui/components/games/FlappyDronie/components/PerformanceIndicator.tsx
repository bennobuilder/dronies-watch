import React from 'react';
import { useAgile } from '@agile-ts/react';
import styled from 'styled-components';
import { flappydronie } from '../../../../../core';

const PerformanceIndicator: React.FC = () => {
  const performance = useAgile(flappydronie.PERFORMANCE);

  return (
    <Container>
      <div>ms: {performance.elapsed}</div>
      <div>fps: {performance.fps}</div>
      <div>lag: {performance.lag}</div>
      <div>offset: {performance.offset}</div>
    </Container>
  );
};

export default PerformanceIndicator;

const Container = styled.div`
  position: absolute;
  left: 5px;
  top: 5px;
`;
