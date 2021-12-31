import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../../../theme/useTheme';

const Footer: React.FC = () => {
  const theme = useTheme();
  return (
    // TODO
    <Container>Footer</Container>
  );
};

export default Footer;

const Container = styled.div`
  background-color: red;
`;
