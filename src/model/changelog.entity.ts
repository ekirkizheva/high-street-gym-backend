import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity({ name: 'changelog' })
export class ChangeLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'datetime', default: () => "CURRENT_TIMESTAMP"})
  date_created: Date;

  @Column({type: 'datetime', default: () => "CURRENT_TIMESTAMP"})
  date_last_modified: Date;

  @ManyToOne(() => Product, { cascade: true, onDelete: "CASCADE" })
  @JoinColumn({name: 'product_id'})
  product: Product;
}