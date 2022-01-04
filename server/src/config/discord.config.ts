import appConfig from './app.config';
import { sprintf } from '../utils/sprintf';

export default {
  APPLICATION_ID: process.env.DISCORD_APPLICATION_ID,
  CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET,
  API_ENDPOINT: 'https://discord.com/api/v8',
  REDIRECT_URI: sprintf(
    process.env.DISCORD_REDIRECT_URL || '',
    appConfig.VERSION,
  ),
};

// Localhost
// https://discord.com/api/oauth2/authorize?client_id=927198260530122773&redirect_uri=http%3A%2F%2Flocalhost%3A9000%2Fv1%2Fauth%2Fdiscord%2Fredirect&response_type=code&scope=identify

// dronies.watch
// https://discord.com/api/oauth2/authorize?client_id=927198260530122773&redirect_uri=https%3A%2F%2Fapi.dronies.watch%2Fv1%2Fauth%2Fdiscord%2Fredirect&response_type=code&scope=identify
