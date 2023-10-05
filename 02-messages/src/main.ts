import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { MessagesModule } from './messages/messages.module';

async function bootstrap() {
  const app = await NestFactory.create(MessagesModule);
  /* Setup Validation Pipe */
  app.useGlobalPipes(new ValidationPipe());

  /* Listen to PORT 3000 */
  await app.listen(3000);
}
bootstrap();
