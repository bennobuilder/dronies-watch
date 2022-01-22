import React from 'react';
import FlappyDronieGame from './components/FlappyDronieGame';
import Spacer from '../../../../components/other/Spacer';
import RecentHighScores from '../RecentHighScores';
import { GAME_TYPES } from '../../../../../core/entities/games';

const FlappyDronieView: React.FC = () => (
  <>
    <FlappyDronieGame />
    <Spacer height={200} />
    <RecentHighScores gameType={GAME_TYPES.flappyDronie} />
  </>
);

export default FlappyDronieView;
