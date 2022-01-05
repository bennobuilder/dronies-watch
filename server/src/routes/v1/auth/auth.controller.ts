import { Response, Request } from 'express';
import config from '../../../config';
import {
  createUser,
  exchangeAccessCodeForCredentials,
  getDiscordUserDetails,
} from './auth.service';

export async function authDiscordRedirectController(
  req: Request,
  res: Response,
) {
  try {
    const { code } = req.query;
    if (code != null) {
      const response = await exchangeAccessCodeForCredentials({
        client_id: config.discord.applicationId || 'unknown',
        client_secret: config.discord.clientSecret || 'unknown',
        grant_type: 'authorization_code',
        code: code.toString(),
        redirect_uri: config.discord.redirectUrl,
      });

      const {
        access_token: accessToken,
        refresh_token: refreshToken,
        token_type: tokenType,
      } = response.data;
      const discordUser = await getDiscordUserDetails(accessToken, tokenType);
      const { id, discriminator, username, avatar } = discordUser.data;
      const user = await createUser({
        accessToken,
        refreshToken,
        discordId: id,
        discriminator,
        name: username,
        avatar: avatar || undefined,
      });

      res.send({ ...user, tag: `${user?.name}#${user?.discriminator}` });
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
}

export async function authDiscordRevokeController(req: Request, res: Response) {
  // try {
  //   const formData = new URLSearchParams({
  //     client_id: config.discord.APPLICATION_ID || 'unknown',
  //     client_secret: config.discord.CLIENT_SECRET || 'unknown',
  //     token: 'todo',
  //   });
  //
  //   const revokeData = await axios.post(
  //     `${config.discord.API_ENDPOINT}/oauth2/token/revoke`,
  //     // https://axios-http.com/docs/urlencoded
  //     formData.toString(),
  //     {
  //       headers: {
  //         'Content-Type': 'application/x-www-form-urlencoded',
  //       },
  //     },
  //   );
  //
  //   res.send(revokeData.data);
  // } catch (err) {
  //   console.log(err);
  //   res.sendStatus(400);
  // }
  res.send(200);
}

export async function getDiscordApplicationIdController(
  req: Request,
  res: Response,
) {
  res.send({ applicationId: config.discord.applicationId });
}

export async function getAuthenticatedDiscordUserController(
  req: Request,
  res: Response,
) {
  try {
    // TODO
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
  res.send(200);
}
