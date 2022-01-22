import { Request, Response } from 'express';
import { createGameLog, getRecentHighScores } from '../../../../services/games';
import { GAME_TYPES } from '../../../../services/games/games.types';
import config from '../../../../config';

export async function playedController(req: Request, res: Response) {
  try {
    // Check if user is authenticated
    const userId = req.userId;
    if (userId == null) return res.sendStatus(401);

    // Extract data from req body
    const { score } = req.body;

    // Save played game stats in database
    if (score != null) await createGameLog(parseInt(userId), score, GAME_TYPES.memoryDronie);

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
}

export async function recentHighScoresController(req: Request, res: Response) {
  try {
    const { limit } = req.query;
    const _limit = typeof limit === 'string' ? parseInt(limit) : 50;

    // Retrieve recent high scoring game logs from the database
    const gameLogs = await getRecentHighScores(GAME_TYPES.memoryDronie, _limit) || [];

    res.send(
      gameLogs.map((gameLog, i) => ({
        rank: i + 1,
        name: gameLog.player?.name || 'unknown',
        discriminator: gameLog.player?.discriminator || 'unknown',
        // https://cdn.discordapp.com/avatars/637931838052237312/6d0a11e764bfe0cda5deda7e0aa8da6f.webp?size=32
        avatarUri: `${config.discord.routes.imageBase}/avatars/${gameLog.player?.discordId}/${gameLog.player?.avatar}.webp?size=32`,
        score: gameLog.score,
        playedAt: gameLog.playedAt,
      })),
    );
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
}
