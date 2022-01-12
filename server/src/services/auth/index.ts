import axios from 'axios';
import { urlEncodeData } from '../../utils/urlEncodeData';
import config from '../../config';
import { getUser } from '../user';
import {
  DiscordOAuth2CredentialsResponse,
  OAuth2TokenExchangeRequestParams,
} from './auth.types';

// Retrieve access and refresh token
export async function exchangeAccessCodeForDiscordCredentials(
  data: OAuth2TokenExchangeRequestParams,
) {
  return await axios.post<DiscordOAuth2CredentialsResponse>(
    config.discord.routes.oauth2Token,
    // https://axios-http.com/docs/urlencoded
    urlEncodeData(data),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  );
}

export async function revokeDiscordToken(userId: string): Promise<boolean> {
  const user = await getUser(userId);
  if (user == null) return false;

  await axios.post(
    config.discord.routes.revokeToken,
    // https://axios-http.com/docs/urlencoded
    urlEncodeData({
      client_id: config.discord.applicationId!,
      client_secret: config.discord.clientSecret!,
      token: user.accessToken,
    }),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  );

  return true;
}
