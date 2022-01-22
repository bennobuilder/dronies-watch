export enum GAME_TYPES {
  flappyDronie = 'flappydronie',
  memoryDronie = 'memorydronie',
  unknown = 'unknown',
}

export type HighScoreItem = {
  rank: number;
  name: string;
  discriminator: string;
  // https://cdn.discordapp.com/avatars/637931838052237312/6d0a11e764bfe0cda5deda7e0aa8da6f.webp?size=32
  avatarUri: string;
  score: number;
  playedAt: Date;
};

export type RecentHighScoresResponse = HighScoreItem[];
