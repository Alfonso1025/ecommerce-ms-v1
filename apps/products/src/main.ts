import { NestFactory } from '@nestjs/core';
import { ProductsModule } from './products.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>
  (
  ProductsModule,
  {
  
  transport: Transport.RMQ,
  options: {urls: ['amqp://localhost:5672'],
  queue: 'products_queue',
  },
  },
  );
  await app.listen();
  }
  bootstrap();
