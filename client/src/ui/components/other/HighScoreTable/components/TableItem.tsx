import React from 'react';
import styled from 'styled-components';
import BottomDivider from './BottomDivider';

const TableItem: React.FC<Props> = (props) => {
  const {
    rank,
    name,
    discriminator,
    score,
    playedDateTime,
    showDivider = true,
  } = props;

  return (
    <Container>
      <Rank>{rank + 1}</Rank>
      <Cell>{name}</Cell>
      <Score>{score}</Score>
      <Cell>15 hours ago</Cell>
      {showDivider && <BottomDivider />}
    </Container>
  );
};

export default TableItem;

type Props = {
  rank: number;
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
  padding: 1rem 1rem;
`;

const Rank = styled(Cell)`
  width: 4ch;
  padding-left: 1rem;

  text-align: right;
`;

const Score = styled(Cell)`
  width: 8ch;
`;
