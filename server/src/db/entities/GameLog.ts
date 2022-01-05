import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'game_log' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'player_id' })
  playerId: string;

  @Column({ name: 'score' })
  score: number;

  @Column({ name: 'created_date_time' })
  createdDateTime: Date;

  @Column({ name: 'game_type' })
  gameType: string;
}
