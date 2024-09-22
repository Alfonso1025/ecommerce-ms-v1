import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { ImageEntity } from './entities/image.entity';
import { PriceHistoryEntity } from './entities/priceHistory.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost', // replace with your database host
      port: 3306, // replace with your database port
      username: 'root', // replace with your database username
      password: 'piloto25Aviador', // replace with your database password
      database: 'products_db', // replace with your database name
      entities: [ ProductEntity, ImageEntity,PriceHistoryEntity],
      synchronize: true, // set to false in production
    }),
    TypeOrmModule.forFeature([ProductEntity,PriceHistoryEntity])
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
