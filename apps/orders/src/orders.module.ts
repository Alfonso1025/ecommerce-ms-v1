import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { OrderProductEntity } from './entities/productsOrder.entity';
import { ProductEntity } from './entities/prouct.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost', // replace with your database host
      port: 3306, // replace with your database port
      username: 'root', // replace with your database username
      password: 'piloto25Aviador', // replace with your database password
      database: 'orders_db', // replace with your database name
      entities: [ OrderEntity, OrderProductEntity,ProductEntity],
      synchronize: true, // set to false in production
    }),
    TypeOrmModule.forFeature([OrderEntity,OrderProductEntity,ProductEntity])
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
