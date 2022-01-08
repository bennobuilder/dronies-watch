import React from 'react';
import styled from 'styled-components';
import BottomDivider from './BottomDivider';

const TableHeader: React.FC = () => (
  <Container>
    <Cell>#</Cell>
    <Cell>User</Cell>
    <Cell>Score</Cell>
    <Cell>Time ago</Cell>
    <BottomDivider />
  </Container>
);

export default TableHeader;

const Container = styled.tr`
  position: relative;
`;

const Cell = styled.th`
  padding: 12px 15px;

  font-family: ${({ theme }) => theme.fontFamily};
  font-size: 1rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.layout.hc};
  text-align: left;
`;
