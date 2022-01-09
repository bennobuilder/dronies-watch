import React from 'react';
import styled from 'styled-components';
import HighScoreTable from '../../../../components/other/HighScoreTable';
import { ui } from '../../../../../core';

// Assets
import DroniesGangImg from '../../../../../assets/app/dronies_gang.png';
import { useWindowSize } from '../../../../hooks/useWindowSize';

const RecentHighScores: React.FC = () => {
  const { windowWidth } = useWindowSize();
  const dummyData = Array.from(Array(23)).map((v, i) => ({
    rank: i + 1,
    name: 'Benno',
    discriminator: '1234',
    score: 47,
    playedDateTime: new Date(Date.now() - 1000 * 60 * 60 * 8),
  }));

  return (
    <Container>
      <Title>Recent Highscores</Title>
      <TableContainer>
        <HighScoreTable data={dummyData.slice(0, 100)} />
        {windowWidth > ui.WIDTH_BREAK_POINTS[0] && (
          <OverlapImage src={DroniesGangImg} loading="lazy" />
        )}
      </TableContainer>
    </Container>
  );
};

export default RecentHighScores;

const Container = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
`;

const Title = styled.h1`
  margin: 0 0 50px 0;

  color: ${({ theme }) => theme.colors.layout.p};
  font-size: 2.5rem;
  font-family: ${({ theme }) => theme.headings.fontFamily};
  white-space: nowrap;
  text-transform: uppercase;

  transition: font-size ${({ theme }) => theme.transitionTimingFunction} 500ms;

  text-shadow: 0 0 50px
    ${({ theme }) => ui.hexToRgba(theme.colors.layout.p, 0.5)};

  @media (max-width: ${ui.WIDTH_BREAK_POINTS[1]}px) {
    font-size: 3rem;
    white-space: pre-wrap;
  }

  @media (max-width: ${ui.WIDTH_BREAK_POINTS[0]}px) {
    font-size: 2rem;
  }
`;

const TableContainer = styled.div`
  position: relative;
  width: 70%;

  @media (max-width: ${ui.WIDTH_BREAK_POINTS[1]}px) {
    width: 100%;
  }
`;

const OverlapImage = styled.img`
  position: absolute;
  left: -25%;
  bottom: -300px;
  width: 150%;

  pointer-events: none;

  @media (max-width: ${ui.WIDTH_BREAK_POINTS[1]}px) {
    bottom: -30%;
  }
`;
