import { Entity, Column, PrimaryColumn, ManyToOne, OneToMany } from 'typeorm';
import { OrderProductEntity } from './productsOrder.entity';



@Entity({name : 'products'})
export class ProductEntity {
    @PrimaryColumn()
    id: number
    @Column()
    name : string 
    // One-to-many relationship with OrderProductEntity
    @OneToMany(() => OrderProductEntity, (orderProduct) => orderProduct.product)
    orderProducts: OrderProductEntity[];
   
}