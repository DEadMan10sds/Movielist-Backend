import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`
    ----------------------------------------------------
   |    _______                                         |
   |    |     __|.-----.-----.-----.-----.----.         |
   |    |__     ||  -__|     |__ --|  _  |   _|         |
   |    |_______||_____|__|__|_____|_____|__|           |
   |                                                    |
   |     _______               __ __                    |
   |    |   |   |.-----.-----.|__|  |_.-----.----.      |
   |    |       ||  _  |     ||  |   _|  _  |   _|      |
   |    |__|_|__||_____|__|__||__|____|_____|__|        |
   |                                                    |
   |                    Port: ${port}                      |
   |                                                    |
   |         By: Adán Sánchez - adansanchez.dev         |
    ----------------------------------------------------`);
}
void bootstrap();
