import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ProductEntity } from './product.entity';


@Entity({name : 'images'})
export class ImageEntity {
  @PrimaryGeneratedColumn()
  productId: number;

  @Column()
  name: string;

  @ManyToOne(() => ProductEntity, (product) => product.images, { onDelete: 'CASCADE' })
  product: ProductEntity;
  
}