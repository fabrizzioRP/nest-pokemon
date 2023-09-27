import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
//
import { AppModule } from './app.module';

async function main() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v2');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  await app.listen(process.env.PORT);
  console.log(`app running on: http:localhost:${process.env.PORT}`);
}

main();
