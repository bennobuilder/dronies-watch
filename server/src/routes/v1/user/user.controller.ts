import { Request, Response } from 'express';
import { getUser } from '../../../services/user';

export async function getUserController(req: Request, res: Response) {
  try {
    // Check if user is authenticated
    const userId = req.userId;
    if (userId == null) return res.sendStatus(401);

    // Retrieve user from the database
    const user = await getUser(userId);
    if (user == null) return res.sendStatus(401);

    res.send({
      user: {
        id: user.id,
        avatar: user.avatar,
        name: user.name,
        discriminator: user.discriminator,
        tag: `${user?.name}#${user?.discriminator}`,
      },
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
}
