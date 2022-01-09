import { Request, Response } from 'express';
import { createGameLog, getRecentHighScores } from '../../../../services/games';

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
    const gameLogs = await getRecentHighScores();

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
