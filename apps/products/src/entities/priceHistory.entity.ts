import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

import { ProductEntity } from './product.entity';

@Entity({name : 'price_history'})
export class PriceHistoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'datetime' })
  start_date: Date;
  @Column({ type: 'timestamp', nullable: true })  
  end_date: Date | null;  
  @Column()
  price: number;
  @ManyToOne(() => ProductEntity, (product) => product.priceHistory)
  product: ProductEntity;
  
}