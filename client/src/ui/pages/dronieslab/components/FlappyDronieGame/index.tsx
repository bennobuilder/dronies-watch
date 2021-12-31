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

const FlappyDronieGame: React.FC = () => {
  const [score, latestScore, highScore] = useAgile([
    flappydronie.SCORE,
    flappydronie.LATEST_SCORE,
    flappydronie.HIGH_SCORE,
  ]);

  return (
    <Container>
      <HeaderContainer>
        <Title>Start Training!</Title>
        <Subtitle>With Flappy Dronie</Subtitle>
      </HeaderContainer>

      <GameContainer>
        <LeftContent>
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
              target="_blank"
            />
          )}
          <StyledInfoBox text="Some new features like a Leaderboard might be added in the near future." />
        </LeftContent>

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
`;

const HeaderContainer = styled.div`
  align-self: flex-start;
`;

const Title = styled.h1`
  margin: 0 0 10px 0;

  color: ${({ theme }) => theme.colors.layout.p};
  font-size: 4rem;
  font-family: ${({ theme }) => theme.headings.fontFamily};
  white-space: nowrap;
  text-transform: uppercase;

  text-shadow: 0 0 50px
    ${({ theme }) => ui.hexToRgba(theme.colors.layout.p, 0.5)};

  @media (max-width: ${ui.BREAK_POINTS[0]}px) {
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

  @media (max-width: ${ui.BREAK_POINTS[0]}px) {
    font-size: 1rem;
  }
`;

const GameContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  width: 100%;

  margin-top: 50px;
`;

const Game = styled(LinesBackground)`
  justify-self: flex-end;
`;

const LeftContent = styled.div`
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
