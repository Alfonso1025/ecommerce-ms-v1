import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

import { OrderEntity } from './order.entity';
import { ProductEntity } from './prouct.entity';

@Entity({ name: 'order_products' })
export class OrderProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => OrderEntity, (order) => order.orderProducts)
  order: OrderEntity;

  @ManyToOne(() => ProductEntity, (product) => product.orderProducts)
  product: ProductEntity;

  @Column()
  price: number; // Price at the time of the order

  @Column()
  quantity: number; // Quantity of the product in this order
}
