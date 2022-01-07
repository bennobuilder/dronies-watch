import { Request } from 'express';
import { getRepository } from 'typeorm';
import { Session } from '../../db/entities/Session';

const sessionRepository = getRepository(Session);

export async function serializeSession(req: Request, userId: string) {
  req.session.userId = userId;
  req.userId = userId;

  // Save Session to database
  const session = sessionRepository.create({
    sessionId: req.sessionID,
    expiresAt: req.session.cookie.expires,
    data: userId,
  });

  return sessionRepository.save(session);
}
