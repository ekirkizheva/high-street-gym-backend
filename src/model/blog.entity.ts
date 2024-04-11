import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entityt';

@Entity({ name: 'blog' })
export class Blog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'datetime', default: () => "CURRENT_TIMESTAMP"})
  date: Date;

  @ManyToOne(() => User, { cascade: true })
  @JoinColumn({name: 'user_id'})
  user: User;

  @Column()
  message: string;
}