import { Column, Entity, ManyToOne, PrimaryColumn, JoinColumn } from 'typeorm';
import { User } from './User.entity';

@Entity({ name: 'sessions' })
export class Session {
  @PrimaryColumn('text', { name: 'session_id' })
  sessionId: string;

  @Column({ name: 'expires_at' })
  expiresAt: Date;

  // Foreign Key
  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => User, (user) => user.sessions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' }) // https://stackoverflow.com/questions/61361008/typeorm-insert-with-relationid
  user: User;
}
