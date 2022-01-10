import { sprintf } from '../utils/sprintf';

const port = process.env.PORT || 9000;
const version = 'v1';

export default {
  version: 'v1',
  port,
  baseUrl: `${sprintf(
    process.env.BASE_URL || 'http://localhost:%s',
    port.toString(),
  )}/${version}`,
  afterOAuth2RedirectUri: process.env.AFTER_OAUTH2_REDIRECT_URI,
};
