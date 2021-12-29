import React from 'react';
import styled from 'styled-components';
import FlappyBird from '../../components/FlappyBird';

const FlappyDronie: React.FC = () => (
  <Container>
    <FlappyBird />
  </Container>
);

export default FlappyDronie;

const Container = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;
