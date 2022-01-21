import React from 'react';
import { useAgile } from '@agile-ts/react';
import styled from 'styled-components';
import Memory from '../../../../components/games/Memory';
import { memory } from '../../../../../core';
import LabelText from '../../../../components/primitive/text/LabelText';
import LinesBackground from '../../../../components/primitive/background/LinesBackground';

const MemoryGame: React.FC = () => {
  const [highScore, moves, timePlayed, maxTime, latestScore] = useAgile([
    memory.HIGH_SCORE,
    memory.MOVES_COUNT,
    memory.TIME_PLAYED,
    memory.MAX_TIME,
    memory.LATEST_SCORE,
  ]);

  return (
    <div>
      <Memory />
      <GameInfoContainer>
        <LabelText label="Moves: " value={moves.toString()} />
        <LabelText label="Time: " value={(maxTime - timePlayed).toString()} />
      </GameInfoContainer>
      <StatsContainer linesCount={0} opacity={0.3}>
        <LabelText label="Latest Score: " value={latestScore.toString()} />
        <LabelText label="High Score: " value={highScore.toString()} />
      </StatsContainer>
    </div>
  );
};

export default MemoryGame;

const GameInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StatsContainer = styled(LinesBackground)`
  margin-top: 20px;
  padding: 20px 60px;
`;
