import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

import { ImageEntity } from './image.entity';
import { PriceHistoryEntity } from './priceHistory.entity';

@Entity({name : 'products'})
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;
   
  @Column()
  description: string;

  @OneToMany(() => PriceHistoryEntity, (priceHistory) => priceHistory.product)
  priceHistory: PriceHistoryEntity[];

  @OneToMany(() => ImageEntity, (image) => image.product)
  images: ImageEntity[];
}
