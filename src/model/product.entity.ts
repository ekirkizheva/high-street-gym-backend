import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Feature } from './feature.entity';

@Entity({ name: 'product' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  product_name: string;

  @Column()
  product_model: string;

  @Column()
  manufacturer: string;

  @Column()
  price: number;

  @Column()
  stock_on_hand: number;

  @ManyToMany(() => Feature, (feature) => feature.id, { 
    cascade: true,  
    onDelete: 'CASCADE',
    onUpdate:'CASCADE' })
  @JoinTable()
  features: Feature[];
}