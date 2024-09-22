import { Controller, Get } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dtos/createOrder.dto';
import { GetOrderByIdDto } from './dtos/getOrderById.dto';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { CreateProductDto } from './dtos/createProductDto';

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @EventPattern('order_created')
  createOrder(order:CreateOrderDto){
    console.log('receiving order from microservice')
    return this.ordersService.createOrder(order);
  }
  @MessagePattern({ cmd: 'order-by-id' })
   getOrderById(data:GetOrderByIdDto) {
      console.log(data)
      const orderId = data.orderId.id
      
      return this.ordersService.getOrderById(orderId)
   }
   @MessagePattern({ cmd: 'order-break-down' })
   async getOrderBreakDown(data:GetOrderByIdDto) {
      console.log(data)
      const orderId = data.orderId.id
      
      //return await this.ordersService.getOrderBreakDown(orderId)
   }
   @EventPattern('product_created')
   createProduct(product: CreateProductDto){
      console.log('this is the product: ',product)
      this.ordersService.createProduct(product)
   }
  
  
}
