import axios from 'axios';
import config from '../../../config';
import { getEncryptedJsonPayload } from '../../utils/crypto';

export const FETCH_RECENT_HIGH_SCORES = async (limit = 50) => {
  const response = await axios.get(
    `${config.api.routes.recentHighScores}?limit=${limit}`,
  );
  console.log(response); // TODO REMOVE
};

export const SEND_SCORE = async (score: number) => {
  await axios.post(
    config.api.routes.played,
    JSON.stringify(getEncryptedJsonPayload({ score })),
    {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    },
  );
};
