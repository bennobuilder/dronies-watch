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
