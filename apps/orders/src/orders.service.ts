
import { ProductsController } from 'apps/api-get-away/src/products/products.controller';
import { CreateOrderDto } from './dtos/createOrder.dto';
import { OrderEntity } from './entities/order.entity';
import { OrderProductEntity } from './entities/productsOrder.entity';
import { ProductEntity } from './entities/prouct.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dtos/createProductDto';

@Injectable()
export class OrdersService {
  constructor(
  @InjectRepository(OrderEntity) private ordersRepo: Repository<OrderEntity>,
  @InjectRepository(OrderProductEntity) private ordersProdRepo: Repository<OrderProductEntity>,
  @InjectRepository(ProductEntity) private productRepo: Repository<ProductEntity>
  ){}

  async createOrder(order: CreateOrderDto) {
    // Step 1: Create and save the order (without products yet)
    const newOrder = this.ordersRepo.create({
      userId: order.userId,
      userName: order.userName,
      total: order.total,
      order_date: order.order_date,
    });

    const savedOrder = await this.ordersRepo.save(newOrder);

    // Step 2: Link the products to the order
    const orderProducts = [];

    for (const item of order.products) {
      // Fetch the product from the ProductEntity table
      const product = await this.productRepo.findOne({ where: { id: item.id } });
      
      if (!product) {
        throw new Error(`Product with ID ${item.id} not found`);
      }

      // Create OrderProductEntity
      const orderProduct = this.ordersProdRepo.create({
        order: savedOrder,
        product: product,
        price: item.price,   // Price at the time of order
        quantity: item.qty, // Quantity for this order
      });

      // Collect the entities to save later
      orderProducts.push(orderProduct);
    }

    // Step 3: Save all the OrderProductEntity records
    await this.ordersProdRepo.save(orderProducts);

    // Return the created order with products
    return {
      ...savedOrder,
      products: orderProducts,
    };
  }

 
  async getOrderById(orderId : number){
   /* const order = await this.ordersRepo.find({where : {id : orderId}})
   return order
  }
  async getOrderBreakDown(orderId : number){
    const orderEntity = await this.ordersRepo.findOne({where : {id : orderId}})
    const productIds = await this.ordersProdRepo.find({where : {orderId}, select:['productId']})
    const productIdArray = productIds.map(product => product.productId);
    return {
      orderEntity,
      productIds: productIdArray
    } */
   }
   createProduct(product: CreateProductDto){
    const productEntity = this.productRepo.create(product) 
    console.log('this is the productEntity: ',productEntity)
    const savedProduct = this.productRepo.save(productEntity)
    console.log('this is the saved product: ',savedProduct)
    return savedProduct
   }
  
}
