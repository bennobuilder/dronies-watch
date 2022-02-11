import { createQueryBuilder, getRepository } from 'typeorm';
import { GameLog } from '../../db';
import { GAME_TYPES } from './games.types';

const gameLogRepository = getRepository(GameLog);

export async function createGameLog(
  userId: number,
  score: number,
  gameType: GAME_TYPES = GAME_TYPES.unknown,
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
  limit = 50,
  gameType: GAME_TYPES = GAME_TYPES.flappyDronie,
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
  const timespanToInclude = 365; // days
  endIncludeDate.setDate(endIncludeDate.getDate() - timespanToInclude);

  // Query all GameLogs in the specified game window and game type
  const recentGameLogsQb = gameLogRepository
    .createQueryBuilder('sub_sub_gameLog')
    .select('*')
    .where('game_type = :gameType', { gameType })
    .andWhere('played_at > :date', { date: endIncludeDate });

  // Extract all max scores grouped by the 'player_id'
  // https://dev.to/yoshi_yoshi/typeorm-query-builder-with-subquery-490c
  const maxScoreQb = createQueryBuilder()
    .select('player_id')
    .addSelect('MAX("score")', 'max_score')
    .from(
      // https://typeorm.io/#/select-query-builder/using-subqueries
      `(${recentGameLogsQb.getQuery()})`,
      'sub_gameLog',
    )
    .setParameters(recentGameLogsQb.getParameters()) // Add Parameters from 'recentGameLogsQb' (e.g. gameType, date)
    .groupBy('player_id');

  // Main Query
  // https://github.com/typeorm/typeorm/issues/5464
  const query = await gameLogRepository
    .createQueryBuilder('gameLog')
    .leftJoin(
      `(${maxScoreQb.getQuery()})`,
      'best_game',
      'best_game.player_id = gameLog.player_id', // = ON best_game.player_id = gameLog.player_id
    )
    .setParameters(maxScoreQb.getParameters()) // Add Parameters from 'maxScoreQb'
    // https://stackoverflow.com/questions/65644410/typeorm-leftjoin-with-3-tables
    .leftJoinAndSelect('gameLog.player', 'user', 'user.id = gameLog.player_id')
    .where('best_game.max_score = gameLog.score')
    .distinctOn(['gameLog.score']) // https://stackoverflow.com/questions/3800551/select-first-row-in-each-group-by-group
    .orderBy('gameLog.score', 'DESC')
    .limit(limit);

  return query.getMany();
}
