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
      <UserContainer>
        <UserImage src="https://cdn.discordapp.com/avatars/637931838052237312/6d0a11e764bfe0cda5deda7e0aa8da6f.webp?size=32" />
        <NameContainer>
          <UserName>{name}</UserName>
          <UserDiscriminator>#1234</UserDiscriminator>
        </NameContainer>
      </UserContainer>
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

const UserContainer = styled(Cell)`
  display: flex;
  flex-direction: row;
  align-items: center;

  width: auto;

  background-color: purple;
`;

const NameContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;

const UserName = styled.div`
  font-family: ${({ theme }) => theme.fontFamily};
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.interactive.primary.p0};
  text-align: left;
`;

const UserDiscriminator = styled.div`
  margin: 0 0 5px 5px;

  font-family: ${({ theme }) => theme.fontFamily};
  font-size: 0.6rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.layout.rHc};
  text-align: left;
`;

const UserImage = styled.img`
  margin-right: 10px;

  width: 40px;
  height: 40px;
  border-radius: 100%;
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
