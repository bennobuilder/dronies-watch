export type User = {
  id: number;
  avatar: string;
  avatarUri: string;
  name: string;
  discriminator: string;
  tag: string;
};

export type RevokeAuthResponse = {
  success: boolean;
};

export type GetCurrentUserResponse = {
  user: User;
};
