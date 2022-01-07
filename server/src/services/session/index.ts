import { Request } from 'express';
import { getRepository } from 'typeorm';
import { Session } from '../../db/entities/Session';

const sessionRepository = getRepository(Session);

export async function serializeSession(req: Request, userId: string) {
  req.session.userId = userId;
  req.userId = userId;

  // Create and save new user
  const session = sessionRepository.create({
    sessionId: req.sessionID,
    expiresAt: req.session.cookie.expires,
    userId,
  });
  return sessionRepository.save(session);
}

export async function deleteSession(userId: string) {
  await sessionRepository.delete({ userId });
}
