import { Request, Response } from 'express';
import { createGameLog, getRecentHighScores } from '../../../../services/games';
import { GAME_TYPES } from '../../../../services/games/games.types';

export async function playedController(req: Request, res: Response) {
  try {
    // Check if user is authenticated
    const userId = req.userId;
    if (userId == null) return res.sendStatus(401);

    // Extract data from req body
    const { score } = req.body;

    // Save played game stats in database
    await createGameLog(parseInt(userId), score);

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
}

export async function recentHighscoresConroller(req: Request, res: Response) {
  try {
    const { limit } = req.query;
    const _limit = typeof limit === 'string' ? parseInt(limit) : 50;

    // Retrieve recent high scoring game logs from the database
    const gameLogs = await getRecentHighScores(GAME_TYPES.flappyDronie, _limit);

    res.send(
      gameLogs.map((gameLog) => ({
        id: gameLog.id,
        score: gameLog.score,
        playedAt: gameLog.playedAt,
        playerId: gameLog.playerId,
      })),
    );
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
}
