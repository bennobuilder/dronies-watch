import React from 'react';
import styled from 'styled-components';
import BottomDivider from './BottomDivider';

const TableItem: React.FC<Props> = (props) => {
  const {
    index,
    name,
    discriminator,
    score,
    playedDateTime,
    showDivider = true,
  } = props;

  return (
    <Container>
      <Cell>{index + 1}</Cell>
      <Cell>{name}</Cell>
      <Cell>{score}</Cell>
      <Cell>15 hours ago</Cell>
      {showDivider && <BottomDivider />}
    </Container>
  );
};

export default TableItem;

type Props = {
  index: number;
  name: string;
  discriminator: string;
  score: number;
  playedDateTime: Date;
  showDivider?: boolean;
};

const Container = styled.tr`
  position: relative;

  text-align: left;
`;

const Cell = styled.td`
  padding: 12px 15px;
`;
