import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'trainer' })
export class Trainer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}