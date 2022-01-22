import React from 'react';
import { useAgile } from '@agile-ts/react';
import styled from 'styled-components';
import Memory from '../../../../../../components/games/MemoryDronie';
import { memorydronie, ui } from '../../../../../../../core';
import LabelText from '../../../../../../components/primitive/text/LabelText';
import LinesBackground from '../../../../../../components/primitive/background/LinesBackground';
import Icon from '../../../../../../components/icons';
import { useEventTracker } from '../../../../../../hooks/useEventTracker';
import { Button } from '../../../../../../components/primitive';

const MemoryGame: React.FC = () => {
  const [highScore, moves, timePlayed, maxTime, latestScore] = useAgile([
    memorydronie.HIGH_SCORE,
    memorydronie.MOVES_COUNT,
    memorydronie.TIME_PLAYED,
    memorydronie.MAX_TIME,
    memorydronie.LATEST_SCORE,
  ]);
  const trackEvent = useEventTracker('Lab - MemoryDronieGame Section');

  return (
    <Container>
      <HeaderContainer>
        <Title>Improve Focus</Title>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <Subtitle>With "Memory Dronie"</Subtitle>
      </HeaderContainer>

      <ContentContainer>
        <InfoContainer>
          <StatsContainer linesCount={0} opacity={0.3}>
            <LabelText label="Latest Score: " value={latestScore.toString()} />
            <LabelText label="High Score: " value={highScore.toString()} />
          </StatsContainer>
          {highScore > 500 && (
            <ShareScoreButton
              leftIcon={Icon.Twitter}
              to={memorydronie.getScoreTweetUri(highScore)}
              target="_blank"
              // Analytics
              onClick={() =>
                trackEvent({
                  action: 'share-score',
                  label: `Shared Memory Dronie Score`,
                })
              }
            >
              Share Score
            </ShareScoreButton>
          )}
        </InfoContainer>

        <MemoryContainer>
          <Memory />
          <GameInfoContainer>
            <LabelText label="Moves: " value={moves.toString()} />
            <LabelText
              label="Time: "
              value={(maxTime - timePlayed).toString()}
            />
          </GameInfoContainer>
        </MemoryContainer>
      </ContentContainer>
    </Container>
  );
};

export default MemoryGame;

const Container = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  width: 100%;

  @media (max-width: ${ui.WIDTH_BREAK_POINTS[1]}px) {
    align-items: center;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: ${ui.WIDTH_BREAK_POINTS[1]}px) {
    align-items: center;
  }
`;

const Title = styled.h1`
  margin: 0 0 10px 0;

  color: ${({ theme }) => theme.colors.layout.p};
  font-size: 4rem;
  font-family: ${({ theme }) => theme.headings.fontFamily};
  white-space: nowrap;
  text-transform: uppercase;
  text-align: center;

  transition: font-size ${({ theme }) => theme.transitionTimingFunction} 500ms;

  text-shadow: 0 0 50px
    ${({ theme }) => ui.hexToRgba(theme.colors.layout.p, 0.5)};

  @media (max-width: ${ui.WIDTH_BREAK_POINTS[1]}px) {
    font-size: 3rem;
    white-space: pre-wrap;
  }

  @media (max-width: ${ui.WIDTH_BREAK_POINTS[0]}px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.h3`
  margin: 0;

  color: ${({ theme }) => theme.colors.interactive.primary.n0};
  font-size: 1.5rem;
  font-family: ${({ theme }) => theme.fontFamily};
  white-space: nowrap;
  text-transform: uppercase;

  @media (max-width: ${ui.WIDTH_BREAK_POINTS[1]}px) {
    font-size: 1rem;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  width: 100%;

  margin-top: 50px;

  @media (max-width: ${ui.WIDTH_BREAK_POINTS[1]}px) {
    flex-direction: column-reverse;
    justify-content: flex-start;
    align-items: center;
  }
`;

const MemoryContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const GameInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: ${ui.WIDTH_BREAK_POINTS[1]}px) {
    margin-top: 30px;
  }
`;

const ShareScoreButton = styled(Button)`
  display: flex;

  margin-top: 50px;
`;

const StatsContainer = styled(LinesBackground)`
  margin-top: 20px;
  padding: 20px 60px;
`;
