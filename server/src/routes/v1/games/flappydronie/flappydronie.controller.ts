import { Request, Response } from 'express';

export async function playedController(req: Request, res: Response) {
  try {
    // Check if user is authenticated
    const userId = req.userId;
    if (userId == null) return res.sendStatus(401);

    // TODO

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
}
