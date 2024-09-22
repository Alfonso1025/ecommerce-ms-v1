import { Controller,Inject,Post,Body, Param, Get } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateOrderDto } from './dtos/createOrders.dto';
import { firstValueFrom } from 'rxjs';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject('ORDERS_SERVICE')
     private clientOrders: ClientProxy, 
    @Inject('PRODUCTS_SERVICE')
     private clientProducts: ClientProxy
    ) {}

  @Post('create')
  createOrder(@Body() order:CreateOrderDto) {
    console.log('sending order from api-get-away')
    this.clientOrders.emit('order_created', order)
  }
  @Get(':id')
  getOrderById(@Param() orderId: number){
    
    return this.clientOrders.send({cmd: 'order-by-id',},{ orderId })
  }
  @Get('break-down/:id')
  async getOrderBreakDown(@Param() orderId: number){
     
   const orderProductIds = await firstValueFrom(
        this.clientOrders.send({cmd: 'order-break-down',},{ orderId })
      )
    const productsIds = orderProductIds.productIds
     
    const productsInfo = await firstValueFrom(  this.clientProducts.send({cmd : 'products-info'}, {productsIds}))
    
    console.log('this is the products info: ', productsInfo)
    
                
    return productsInfo

  }
}