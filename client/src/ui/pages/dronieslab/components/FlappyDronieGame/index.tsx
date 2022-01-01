import React from 'react';
import styled from 'styled-components';
import { useAgile } from '@agile-ts/react';
import { flappydronie, ui } from '../../../../../core';
import LinesBackground from '../../../../components/primitive/background/LinesBackground';
import FlappyDronie from '../../../../components/games/FlappyDronie';
import LabelText from './components/LabelText';
import { Button } from '../../../../components/primitive';
import Icon from '../../../../components/icons';
import InfoBox from '../../../../components/other/InfoBox';
import { useGAEventsTracker } from '../../../../hooks/useGAEventsTracker';

const FlappyDronieGame: React.FC = () => {
  const [score, latestScore, highScore] = useAgile([
    flappydronie.SCORE,
    flappydronie.LATEST_SCORE,
    flappydronie.HIGH_SCORE,
  ]);
  const GAEventsTracker = useGAEventsTracker('Lab - FlappyDronieGame Section');

  return (
    <Container>
      <HeaderContainer>
        <Title>Start Training!</Title>
        <Subtitle>With Flappy Dronie</Subtitle>
      </HeaderContainer>

      <GameContainer>
        <InfoContainer>
          <StatsContainer>
            <LabelText label="Score: " value={score.toString()} />
            <LabelText label="Latest Score: " value={latestScore.toString()} />
            <LabelText label="High Score: " value={highScore.toString()} />
          </StatsContainer>
          {highScore > 5 && (
            <ShareScoreButton
              text="Share Score"
              icon={Icon.Twitter}
              to={flappydronie.getScoreTweet(highScore)}
              onClick={() =>
                GAEventsTracker('share-score', `Shared Flappy Dronie Score`)
              }
              target="_blank"
            />
          )}
          <StyledInfoBox text="Some new features like a Leaderboard might be added in the near future." />
        </InfoContainer>

        <Game linesCount={20}>
          <FlappyDronie />
        </Game>
      </GameContainer>
    </Container>
  );
};

export default FlappyDronieGame;

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

const Subtitle = styled.h3`
  margin: 0;

  color: ${({ theme }) => theme.colors.interactive.primary.p0};
  font-size: 1.5rem;
  font-family: ${({ theme }) => theme.fontFamily};
  white-space: nowrap;
  text-transform: uppercase;

  @media (max-width: ${ui.WIDTH_BREAK_POINTS[1]}px) {
    font-size: 1rem;
  }
`;

const GameContainer = styled.div`
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

const Game = styled(LinesBackground)`
  @media (max-width: ${ui.WIDTH_BREAK_POINTS[0]}px) {
    padding: 5px;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StatsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ShareScoreButton = styled(Button)`
  margin-top: 50px;
`;

const StyledInfoBox = styled(InfoBox)`
  margin-top: 100px;
`;
