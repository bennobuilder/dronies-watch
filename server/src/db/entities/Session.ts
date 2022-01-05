import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'sessions' })
export class Session {
  @PrimaryColumn('text', { name: 'session_id' })
  sessionId: string;

  @Column({ name: 'expires_at' })
  expiresAt: Date;

  @Column('text')
  data: string;
}
