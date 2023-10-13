import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
// const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // cookies // moved to app.module to support unit testing
  // app.use(
  //   cookieSession({
  //     keys: ['whatever'],
  //   }),
  // );
  // validation pipe //moved to app.module to support unit testing
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true,
  //   }),
  // );
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
