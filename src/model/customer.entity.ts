import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'customer' })
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  cust_phone: string;

  @Column()
  cust_email: string;

  @Column()
  cust_address: string;

  @Column()
  postcode: string;

  @Column()
  city: string;

  @Column()
  state: string;
}