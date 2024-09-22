import { NestFactory } from '@nestjs/core';
import { OrdersModule } from './orders.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>
  (
  OrdersModule,
  {
  
  transport: Transport.RMQ,
  options: {urls: ['amqp://localhost:5672'],
  queue: 'orders_queue',
  },
  },
  );
  await app.listen();
  }
  bootstrap();