import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User.entity';

@Entity({ name: 'game_logs' })
export class GameLog {
  @PrimaryGeneratedColumn()
  id: number;

  // Foreign Key
  @Column({ name: 'player_id' })
  playerId: number; // https://stackoverflow.com/questions/61361008/typeorm-insert-with-relationid

  @ManyToOne(() => User, (user) => user.gameLogs, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'player_id' })
  player: User;

  @Column({ name: 'score' })
  score: number;

  @Column({ name: 'played_at' })
  playedAt: Date;

  @Column({ name: 'game_type' })
  gameType: string;
}
