import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ClassType } from './class-type.entity';
import { Trainer } from './trainer.entity';

@Entity({ name: 'scheduled_classes' })
export class ScheduledClasses {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  weekday: number;

  @Column()
  time: number; // In minutes (0 - 1440) 1 is 00:01 and 0 / 1440 is 0:00

  @Column()
  duration: number; // In minutes (0 - 1440) 1 is 00:01 and 0 / 1440 is 0:00

  @Column()
  level: string;

  @ManyToOne(() => ClassType, { cascade: true })
  @JoinColumn({name: 'class_id'})
  class: ClassType;

  @ManyToOne(() => Trainer, { cascade: true })
  @JoinColumn({name: 'trainer_id'})
  trainer: Trainer;
}