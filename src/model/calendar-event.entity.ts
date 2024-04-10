import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Trainer } from './trainer.entity';

@Entity({ name: 'calendar_event' })
export class CalendarEvent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  recurring: boolean;

  @Column()
  weekday: number;

  @Column()
  duration: number;

  @Column()
  level: string;

  @ManyToOne(() => Trainer, { cascade: true })
  @JoinColumn({name: 'trainer_id'})
  trainer: Trainer;
}