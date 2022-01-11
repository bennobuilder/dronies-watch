import axios from 'axios';
import config from '../../../config';
import { getEncryptedJsonPayload } from '../../utils/crypto';
import { RecentHighScoresResponse } from './game.types';

export const FETCH_RECENT_HIGH_SCORES = async (limit = 50) => {
  const response = await axios.get<RecentHighScoresResponse>(
    `${config.api.routes.recentHighScores}?limit=${limit}`,
  );
  return response.data.map((v) => {
    v.playedAt = new Date(v.playedAt);
    return v;
  });
};

export const SEND_SCORE = async (score: number) =>
  axios.post(
    config.api.routes.played,
    JSON.stringify(getEncryptedJsonPayload({ score })),
    {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    },
  );
