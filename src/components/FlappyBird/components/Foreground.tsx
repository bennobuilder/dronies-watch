import React from 'react';
import styled from 'styled-components';

// Assets
import ForegroundImage from '../../../assets/map/ground_Forest.png';

const Foreground: React.FC = () => <Body />;

export default Foreground;

const Body = styled.div`
  position: absolute;
  bottom: 0;
  width: 306px;
  height: 108px;
  background: url(${ForegroundImage});
`;
