import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'class_type' })
export class ClassType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}