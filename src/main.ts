import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { HttpExceptionFilter } from './middleware/http-exception.filter';

const port = process.env.PORT || 3020;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(port);
  Logger.log(`🚀 Server running on http://localhost:${port}`, 'Bootstrap');
}

bootstrap();
