import { Request } from 'express';
import { getRepository } from 'typeorm';
import { Session } from '../../db/entities/Session';

const sessionRepository = getRepository(Session);

export async function serializeSession(req: Request, userId: string) {
  req.session.userId = userId;
  req.userId = userId;

  // Delete expired Sessions
  const sessionsInDB = await sessionRepository.find({
    where: { userId: parseInt(userId) },
  });
  const currentTime = new Date();
  let deletedSessions = 0;
  for (const session of sessionsInDB) {
    if (
      session.expiresAt < currentTime // or delete expired session
    ) {
      await sessionRepository.delete(session);
      deletedSessions++;
    }
  }

  // Delete first Session if user still has more than 3 active sessions
  if (sessionsInDB.length - deletedSessions >= 3) {
    await sessionRepository.delete(sessionsInDB[0]);
  }

  // Create and save new session
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
