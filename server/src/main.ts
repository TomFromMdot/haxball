import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


import { PrismaClientExceptionFilter, PrismaClientValidationFilter } from './exception-filters/prisma-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,);

  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
    credentials: true,
  });

  app.useGlobalFilters(new PrismaClientExceptionFilter());
  app.useGlobalFilters(new PrismaClientValidationFilter())

  await app.listen(4500);
}

bootstrap();
