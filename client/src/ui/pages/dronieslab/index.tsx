import React from 'react';
import styled from 'styled-components';
import { useAgile } from '@agile-ts/react';
import FlappyDronie from './components/FlappyDronie';
import { flappydronie, ui } from '../../../core';
import { useTheme } from '../../theme/useTheme';
import PageLayout from '../../components/layout/PageLayout';
import Icon from '../../components/icons';
import { Button } from '../../components/primitive';

const FlappyDronieScreen: React.FC = () => {
  const [score, highScore] = useAgile([
    flappydronie.SCORE,
    flappydronie.HIGH_SCORE,
  ]);
  const theme = useTheme();
  console.log(theme);

  return (
    <PageLayout>
      <Container>
        <FlappyDronie />
        <TextContainer>
          <ScoreContainer>
            <div>Score: {score}</div>
            <div>High Score: {highScore}</div>
          </ScoreContainer>
          <a href="https://github.com/bennodev19/dronies-watch">Github</a>
          <Icon.Discord width={100} height={100} />
          <Icon.Dronies width={100} height={100} />
          <Icon.Lab width={100} height={100} />
          <Icon.Twitter width={100} height={100} />
          <Button text="Twitter" icon={Icon.Twitter} />
        </TextContainer>
      </Container>
    </PageLayout>
  );
};

export default FlappyDronieScreen;

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TextContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  width: ${ui.WIDTH}px;
`;

const ScoreContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
`;
