import appConfig from './app.config';
import { urlEncodeData } from '../utils/urlEncodeData';

const apiEndpoint = 'https://discord.com/api/v8';
const applicationId = process.env.DISCORD_APPLICATION_ID;
const oAuth2RedirectUri = `${appConfig.baseUrl}/auth/discord/redirect`;

export default {
  applicationId,
  clientSecret: process.env.DISCORD_CLIENT_SECRET,
  apiEndpoint,
  oAuth2RedirectUri,
  afterOAuth2RedirectUri: appConfig.afterOAuth2RedirectUri,

  routes: {
    oauth2Token: `${apiEndpoint}/oauth2/token`,
    oauth2User: `${apiEndpoint}/users/@me`,
    oauth2Login: `https://discord.com/api/oauth2/authorize?client_id=${applicationId}&redirect_uri=${urlEncodeData(
      oAuth2RedirectUri,
    )}&response_type=code&scope=identify`,
    revokeToken: `${apiEndpoint}/oauth2/token/revoke`,
    imageBase: `https://cdn.discordapp.com`,
  },
};
