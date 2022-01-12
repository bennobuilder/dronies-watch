import React from 'react';
import styled from 'styled-components';
import BottomDivider from './BottomDivider';
import { HORIZONTAL_PADDING } from '../controller';

const TableHeader: React.FC = () => (
  <Container>
    <RankText>#</RankText>
    <UserText>User</UserText>
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
  padding: 15px 0;

  font-family: ${({ theme }) => theme.fontFamily};
  font-size: 14px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.layout.hc};
  text-align: left;
`;

const RankText = styled(Cell)`
  padding-left: ${HORIZONTAL_PADDING}px;
`;

const UserText = styled(Cell)`
  padding-left: 20px;
`;
