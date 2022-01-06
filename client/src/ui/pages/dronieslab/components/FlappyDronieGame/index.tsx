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
import { useEventTracker } from '../../../../hooks/useEventTracker';
import { useTheme } from '../../../../theme/useTheme';

const FlappyDronieGame: React.FC = () => {
  const [score, latestScore, highScore, gameStatus] = useAgile([
    flappydronie.SCORE,
    flappydronie.LATEST_SCORE,
    flappydronie.HIGH_SCORE,
    flappydronie.STATUS,
  ]);
  const trackEvent = useEventTracker('Lab - FlappyDronieGame Section');
  const theme = useTheme();

  return (
    <Container>
      <HeaderContainer>
        <Title>Start Training!</Title>
        <Subtitle>With Flappy Dronie</Subtitle>
      </HeaderContainer>

      <ContentContainer>
        <InfoContainer>
          <StatsContainer linesCount={0} opacity={0.3}>
            <LabelText label="Score: " value={score.toString()} />
            <LabelText label="Latest Score: " value={latestScore.toString()} />
            <LabelText label="High Score: " value={highScore.toString()} />
          </StatsContainer>

          {highScore > 5 && (
            <ShareScoreButton
              text="Share Score"
              icon={Icon.Twitter}
              to={flappydronie.getScoreTweet(highScore)}
              target="_blank"
              // Analytics
              onClick={() =>
                trackEvent({
                  action: 'share-score',
                  label: `Shared Flappy Dronie Score`,
                })
              }
            />
          )}
          <StyledInfoBox text="Some new features like a Leaderboard might be added in the near future." />
        </InfoContainer>

        <GameContainer>
          <Game linesCount={20}>
            <FlappyDronie />
          </Game>
          <ClickToStartContainer
            hide={gameStatus !== flappydronie.GAME_STATUS.SPLASH}
          >
            <Icon.Click width={30} height={30} color={theme.colors.layout.hc} />
            <ClickToStartText>Click to Start</ClickToStartText>
          </ClickToStartContainer>
        </GameContainer>
      </ContentContainer>
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

const Game = styled(LinesBackground)`
  @media (max-width: ${ui.WIDTH_BREAK_POINTS[0]}px) {
    padding: 5px;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;

  @media (max-width: ${ui.WIDTH_BREAK_POINTS[1]}px) {
    margin-top: 30px;
  }
`;

const StatsContainer = styled(LinesBackground)`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 20px 50px;
`;

const ShareScoreButton = styled(Button)`
  margin-top: 50px;
`;

const StyledInfoBox = styled(InfoBox)`
  margin-top: 100px;
`;

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ClickToStartContainer = styled.div<{ hide: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;

  margin-top: 20px;

  opacity: ${({ hide }) => (hide ? 0 : 1)};

  transition: opacity ${({ theme }) => theme.transitionTimingFunction} 500ms;
  animation: pulse 1s linear infinite;

  @keyframes pulse {
    0% {
      transform: scale(1, 1);
    }

    50% {
      transform: scale(1.05, 1.05);
    }

    100% {
      transform: scale(1, 1);
    }
  }
`;

const ClickToStartText = styled.p`
  margin: 0 0 0 10px;

  color: ${({ theme }) => theme.colors.layout.hc};
  font-size: 1rem;
  font-family: ${({ theme }) => theme.fontFamily};
  text-align: center;
`;
