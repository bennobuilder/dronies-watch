import axios from 'axios';
import {
  DiscordOAuth2CredentialsResponse,
  OAuth2TokenExchangeRequestParams,
} from '../../routes/v1/auth/auth.types';
import { urlEncodeData } from '../../utils/urlEncodeData';
import config from '../../config';
import { getUser } from '../user';

// Retrieve access and refresh token
export async function exchangeAccessCodeForCredentials(
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

export async function revokeToken(userId: string): Promise<boolean> {
  const user = await getUser(userId);
  if (user == null) return false;

  // TODO delete user and session

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
