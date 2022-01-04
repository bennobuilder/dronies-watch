import { Response, Request } from 'express';
import { URLSearchParams } from 'url';
import config from '../../../config';
import axios from 'axios';

export async function authDiscordRedirectController(
  req: Request,
  res: Response,
) {
  try {
    const { code } = req.query;
    if (code != null) {
      const formData = new URLSearchParams({
        client_id: config.discord.applicationId || 'unknown',
        client_secret: config.discord.clientSecret || 'unknown',
        grant_type: 'authorization_code',
        code: code.toString(),
        redirect_uri: config.discord.redirectUrl,
      });

      const authResponse = await axios.post(
        `${config.discord.apiEndpoint}/oauth2/token`,
        // https://axios-http.com/docs/urlencoded
        formData.toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      console.log(authResponse);

      res.send(200);
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
  // try {
  //   const userResponse = await axios.get(
  //     'https://discord.com/api/v8/users/@me',
  //     {
  //       headers: {
  //         // tokenType = 'Bearer' (https://www.devopsschool.com/blog/what-is-bearer-token-and-how-it-works/)
  //         Authorization: `${'tokenType'} ${'accessToken'}`,
  //       },
  //     },
  //   );
  //   res.send(userResponse.data);
  // } catch (err) {
  //   console.log(err);
  //   res.sendStatus(400);
  // }
  res.send(200);
}
