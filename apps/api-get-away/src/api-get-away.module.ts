import { Module } from '@nestjs/common';
import { ApiGetAwayController } from './api-get-away.controller';
import { ClientsModule,Transport } from '@nestjs/microservices';
import { ProductsController } from './products/products.controller';
import { OrdersController } from './orders/orders.controller';


@Module({
  imports: [
  ClientsModule.register([
  {
  name: 'PRODUCTS_SERVICE',
  transport: Transport.RMQ,options: {urls: ['amqp://localhost:5672'],
  queue: 'products_queue',},
  },
  {
    name: 'ORDERS_SERVICE',
    transport: Transport.RMQ,options: {urls: ['amqp://localhost:5672'],
    queue: 'orders_queue',},
    },
  
  ]),
  ],
  controllers: [ProductsController,OrdersController],})
  export class ApiGatewayModule {}