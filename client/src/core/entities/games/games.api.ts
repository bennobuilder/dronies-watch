import axios from 'axios';
import config from '../../../config';
import { getEncryptedJsonPayload } from '../../utils/crypto';
import { RecentHighScoresResponse } from './games.types';

export const FETCH_RECENT_HIGH_SCORES = async (limit = 50, game: string) => {
  const response = await axios.get<RecentHighScoresResponse>(
    `${config.api.routes.recentHighScores(game)}?limit=${limit}`,
  );
  const data = Array.isArray(response.data) ? response.data : [];
  return data.map((v) => {
    v.playedAt = new Date(v.playedAt);
    return v;
  });
};

export const SEND_SCORE = async (score: number, game: string) =>
  axios.post(
    config.api.routes.played(game),
    JSON.stringify(getEncryptedJsonPayload({ score })),
    {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    },
  );
