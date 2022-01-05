import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'discord_id', unique: true })
  discordId: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'discriminator' })
  discriminator: string;

  @Column({ name: 'avatar', nullable: true })
  avatar?: string;

  @Column({ name: 'discord_access_token' })
  accessToken: string;

  @Column({ name: 'discord_refresh_token' })
  refreshToken: string;
}
