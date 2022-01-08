import { NextFunction, Request, Response } from 'express';
import { signedCookie } from 'cookie-parser';
import { getRepository } from 'typeorm';
import { Session } from '../../db/entities/Session';
import config from '../../config';

const sessionRepository = getRepository(Session);
const discordSessionConfig = config.session.discord;

// Middleware function
export async function deserializeSession(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (req.cookies[discordSessionConfig.name] == null) return next();

  // Retrieve Session id from the cookies
  const sessionId = signedCookie(
    req.cookies[discordSessionConfig.name],
    discordSessionConfig.secret,
  ).toString();

  // Check if Session exists
  const sessionInDB = await sessionRepository.findOne({
    sessionId,
  });
  if (sessionInDB == null) return next();

  // Check if Session is expired
  const currentTime = new Date();
  if (sessionInDB.expiresAt < currentTime) {
    // Delete expired sessions from the database
    // TODO create cronjob that deletes expired session every day
    await sessionRepository.delete(sessionInDB);
    return next();
  }

  const data = JSON.parse(sessionInDB.userId);
  req.userId = data;

  return next(); // Go to next middleware
}
