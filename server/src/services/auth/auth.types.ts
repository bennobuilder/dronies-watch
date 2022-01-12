export type OAuth2TokenExchangeRequestParams = {
  client_id: string;
  client_secret: string;
  grant_type: string;
  code: string;
  redirect_uri: string;
};

export type DiscordOAuth2CredentialsResponse = {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
};

