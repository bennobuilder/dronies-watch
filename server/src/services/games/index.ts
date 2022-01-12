import { getRepository } from 'typeorm';
import { GameLog } from '../../db';
import { GAME_TYPES } from './games.types';

const gameLogRepository = getRepository(GameLog);

export async function createGameLog(
  userId: number,
  score: number,
  gameType: GAME_TYPES = GAME_TYPES.flappyDronie,
) {
  const newGameLog = gameLogRepository.create({
    gameType,
    playerId: userId,
    score: score,
    playedAt: new Date(),
  });
  return gameLogRepository.save(newGameLog);
}

export async function getRecentHighScores(
  gameType: GAME_TYPES = GAME_TYPES.flappyDronie,
  limit = 50,
) {
  /**
   Query with SQL:

   SELECT g.id AS id, g.score AS score, u.id AS userId, g.created_date_time AS playedAt
   FROM game_log AS g
   JOIN users AS u  -- Joining the two Tables does 'typeorm' via relations so before even asking for it
   ON g.player_id = u.id
   WHERE g.created_date_time > CURRENT_DATE - INTERVAL '7 days'
   AND g.game_type = 'flappydronie'
   GROUP BY u.id, g.id
   ORDER BY g.score DESC
   LIMIT 50;
   */

  const endIncludeDate = new Date();
  endIncludeDate.setDate(endIncludeDate.getDate() - 7);

  // Query recent games with a high score
  // https://github.com/typeorm/typeorm/issues/5464
  const query = await gameLogRepository
    .createQueryBuilder('gameLog')
    .leftJoin(
      (qb) =>
        qb
          .from(GameLog, 'sub_gameLog')
          .select('MAX("score")', 'max_score')
          .addSelect('player_id')
          .groupBy('player_id'),
      'best_game',
      'best_game.player_id = gameLog.player_id', // = ON best_game.player_id = gameLog.player_id
    )
    // https://stackoverflow.com/questions/65644410/typeorm-leftjoin-with-3-tables
    .leftJoinAndSelect('gameLog.player', 'user', 'user.id = gameLog.player_id')
    .where('best_game.max_score = gameLog.score')
    .andWhere('gameLog.game_type = :gameType', { gameType })
    .andWhere('gameLog.played_at > :date', { date: endIncludeDate })
    .distinctOn(['gameLog.score']) // https://stackoverflow.com/questions/3800551/select-first-row-in-each-group-by-group
    .orderBy('gameLog.score', 'DESC')
    .limit(limit);

  return query.getMany();
}
