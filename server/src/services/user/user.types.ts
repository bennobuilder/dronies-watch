export type CreateUserParams = {
  discordId: string;
  name: string;
  discriminator: string;
  avatar?: string;
};

export type UserCredentials = {
  accessToken: string;
  refreshToken: string;
};

export type UpdateUserParams = CreateUserParams;
