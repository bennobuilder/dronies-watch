import express from 'express';
import config from '../../../config';
import axios from 'axios';
import { URLSearchParams } from 'url';

// TODO REMOVE
let accessToken = '';
let refreshToken = '';
let tokenType = '';

const router = express.Router();

router.get('/discord/applicationId', (req, res, next) => {
  res.send({ applicationId: config.discord.APPLICATION_ID });
});

router.get('/discord/redirect', async (req, res, next) => {
  try {
    const { code } = req.query;
    if (code != null) {
      const formData = new URLSearchParams({
        client_id: config.discord.APPLICATION_ID || 'unknown',
        client_secret: config.discord.CLIENT_SECRET || 'unknown',
        grant_type: 'authorization_code',
        code: code.toString(),
        redirect_uri: config.discord.REDIRECT_URI,
      });

      const authResponse = await axios.post(
        `${config.discord.API_ENDPOINT}/oauth2/token`,
        // https://axios-http.com/docs/urlencoded
        formData.toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      // TODO REMOVE
      accessToken = authResponse.data.access_token;
      refreshToken = authResponse.data.refresh_token;
      tokenType = authResponse.data.token_type;

      res.send(200);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
});

router.get('/discord/revoke', async (req, res, next) => {
  try {
    const formData = new URLSearchParams({
      client_id: config.discord.APPLICATION_ID || 'unknown',
      client_secret: config.discord.CLIENT_SECRET || 'unknown',
      token: accessToken,
    });

    const revokeData = await axios.post(
      `${config.discord.API_ENDPOINT}/oauth2/token/revoke`,
      // https://axios-http.com/docs/urlencoded
      formData.toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    res.send(revokeData.data);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
});

router.get('/discord/user', async (req, res, next) => {
  try {
    const userResponse = await axios.get(
      'https://discord.com/api/v8/users/@me',
      {
        headers: {
          // tokenType = 'Bearer' (https://www.devopsschool.com/blog/what-is-bearer-token-and-how-it-works/)
          Authorization: `${tokenType} ${accessToken}`,
        },
      },
    );
    res.send(userResponse.data);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
});

export default router;
