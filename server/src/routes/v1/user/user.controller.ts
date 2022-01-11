import { Request, Response } from 'express';
import { getUser } from '../../../services/user';
import config from '../../../config';

export async function getUserController(req: Request, res: Response) {
  try {
    // Check if user is authenticated
    const userId = req.userId;
    if (userId == null) return res.sendStatus(401);

    // Retrieve user from the database
    const user = await getUser(userId);
    if (user == null) return res.sendStatus(401);

    res.send({
      id: user.id,
      avatar: user.avatar,
      // https://cdn.discordapp.com/avatars/637931838052237312/6d0a11e764bfe0cda5deda7e0aa8da6f.webp?size=32
      avatarUrl: `${config.discord.routes.imageBase}/avatars/${user.discordId}/${user.avatar}.webp?size=32`,
      name: user.name,
      discriminator: user.discriminator,
      tag: `${user?.name}#${user?.discriminator}`,
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
}
