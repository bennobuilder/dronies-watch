import { sprintf } from '../utils/sprintf';

const port =
  process.env.PORT || // Used by services that offer managed hosting e.g. Heroku
  process.env.APP_PORT ||
  9000;
const version = 'v1';

export default {
  version: 'v1',
  port,
  baseUrl: `${sprintf(
    process.env.APP_BASE_URL || 'http://localhost:%s',
    port.toString(),
  )}/${version}`,
  afterOAuth2RedirectUri: process.env.APP_AFTER_OAUTH2_REDIRECT_URI,
  corsOrigin: process.env.APP_CORS_ORIGIN || 'http://localhost:3000',
  jsonPayloadSecret: process.env.APP_JSON_PAYLOAD_SECRET || 'AVerySecretSecret',
};
