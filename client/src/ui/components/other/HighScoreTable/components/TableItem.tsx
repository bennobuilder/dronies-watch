import React from 'react';
import styled from 'styled-components';
import BottomDivider from './BottomDivider';

const HORIZONTAL_PADDING = 30;

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
      <RankText>{rank}</RankText>
      <NameText>{name}</NameText>
      <ScoreText>{score}</ScoreText>
      <TimeText>15 hours ago</TimeText>
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

const RankText = styled(Cell)`
  width: 5%;
  padding-left: ${HORIZONTAL_PADDING}px;

  font-family: ${({ theme }) => theme.fontFamily};
  font-size: 1rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.layout.hc};
  text-align: left;

  background-color: blue;
`;

const NameText = styled(Cell)`
  width: auto;

  font-family: ${({ theme }) => theme.fontFamily};
  font-size: 1rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.layout.hc};
  text-align: left;

  background-color: purple;
`;

const ScoreText = styled(Cell)`
  width: 1%;
  padding-right: 50px;

  font-family: ${({ theme }) => theme.fontFamily};
  font-size: 2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.primitiveColors.red};
  text-align: center;

  background-color: green;
`;

const TimeText = styled(Cell)`
  width: 1%; // https://stackoverflow.com/questions/26983301/how-to-make-a-table-column-be-a-minimum-width
  padding-right: ${HORIZONTAL_PADDING}px;

  font-family: ${({ theme }) => theme.fontFamily};
  font-size: 1rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.layout.hc};
  text-align: right;
  white-space: nowrap;

  background-color: red;
`;
