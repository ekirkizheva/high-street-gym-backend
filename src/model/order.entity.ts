import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Customer } from './customer.entity';

@Entity({ name: 'order' })
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  order_date: Date;

  @Column()
  order_delivery_date: Date;

  @ManyToOne(() => Customer, { cascade: true })
  @JoinColumn({name: 'customer_id'})
  customer: Customer;
}