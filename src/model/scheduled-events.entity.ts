import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Trainer } from './trainer.entity';
import { User } from './user.entityt';

@Entity({ name: 'scheduled_events' })
export class ScheduledEvents {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  time: number;

  @Column()
  duration: number;

  @ManyToOne(() => Trainer, { cascade: true })
  @JoinColumn({name: 'trainer_id'})
  trainer: Trainer;

  @ManyToOne(() => User, { cascade: true })
  @JoinColumn({name: 'user_id'})
  user: User;
}