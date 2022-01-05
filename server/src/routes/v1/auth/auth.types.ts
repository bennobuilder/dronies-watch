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

export type DiscordOAuth2UserResponse = {
  id: string;
  username: string;
  avatar: string | null;
  discriminator: string;
  email?: string;
  verified?: boolean;
  public_flags: number;
  flags: number;
  banner: string | null;
  banner_color: string | null;
  accent_color: string | null;
  locale: string;
  mfa_enabled: boolean;
};

export type CreateUserParams = {
  discordId: string;
  accessToken: string;
  refreshToken: string;
  name: string;
  discriminator: string;
  avatar?: string;
};

export type UpdateUserParams = CreateUserParams;
