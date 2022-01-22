import React from 'react';
import Spacer from '../../../../components/other/Spacer';
import MemoryDronieGame from './components/MemoryDronieGame';
import RecentHighScores from '../RecentHighScores';
import { GAME_TYPES } from '../../../../../core/entities/games';

const FlappyDronieView: React.FC = () => (
  <>
    <MemoryDronieGame />
    <Spacer height={200} />
    <RecentHighScores gameType={GAME_TYPES.memoryDronie} />
  </>
);

export default FlappyDronieView;
