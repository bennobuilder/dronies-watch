import { Request, Response } from 'express';
import { getUser } from './user.service';

export async function getUserController(req: Request, res: Response) {
  const userId = req.userId;

  if (userId == null) return res.sendStatus(401);

  const user = await getUser(userId);

  res.send(user);
}
