import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity({ name: 'feature' })
export class Feature {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  weight: number;

  @Column()
  dimensions: string;

  @Column()
  os: string;

  @Column()
  screensize: string;

  @Column()
  resolution: string;

  @Column()
  cpu: string;

  @Column()
  ram: string;

  @Column()
  storage: string;

  @Column()
  battery: string;

  @Column()
  rear_camera: string;

  @Column()
  front_camera: string;

  @ManyToMany(() => Product, (product) => product.id, { 
    cascade: true,  
    onDelete: 'CASCADE',
    onUpdate:'CASCADE'  })
  @JoinTable()
  features: Product[];
}