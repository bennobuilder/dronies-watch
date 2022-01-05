import { Request, Response } from 'express';

export async function playedController(req: Request, res: Response) {
  if (req.userId != null) {
    // TODO
    res.sendStatus(200);
  }

  res.sendStatus(401);
}
