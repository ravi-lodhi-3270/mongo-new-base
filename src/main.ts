import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import mongoose from 'mongoose';

async function bootstrap() {
  mongoose.set('debug', true);
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
