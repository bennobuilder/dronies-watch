import React from 'react';
import styled from 'styled-components';
import { useAgile } from '@agile-ts/react';
import { bird } from '../../../core';

// Assets
import PlaneImage from '../../../assets/vehicles/plane_default.png';

const Bird: React.FC = () => {
  const [{ r, y }] = useAgile([bird.TRANSLATION]);

  return <Body y={y} r={r} />;
};

export default Bird;

const Body = styled.div<{ y: number; r: number }>`
  position: absolute;
  top: ${({ y }) => y};
  left: 120px;

  width: 38px;
  height: 26px;

  background: url(${PlaneImage});

  transform: rotate(${({ r }) => r}deg);

  transition: transfrom 100ms, top 300ms;
`;
