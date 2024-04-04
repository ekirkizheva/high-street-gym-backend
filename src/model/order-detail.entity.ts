import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';
import { Product } from './product.entity';

@Entity({ name: 'order_detail' })
export class OrderDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column()
  price_sold: number;

  @ManyToOne(() => Product, { cascade: true })
  @JoinColumn({name: 'product_id'})
  product: Product;

  @ManyToOne(() => Order, { cascade: true })
  @JoinColumn({name: 'order_id'})
  order: Order;
}