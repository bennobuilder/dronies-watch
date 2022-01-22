import { FETCH_RECENT_HIGH_SCORES, SEND_SCORE } from './games.api';
import { HighScoreItem } from './games.types';

export const fetchRecentHighScores = async (
  limit = 50,
  game: string,
): Promise<HighScoreItem[]> => FETCH_RECENT_HIGH_SCORES(limit, game);

export const sendHighScore = async (score: number, game: string) => {
  await SEND_SCORE(score, game);
};
