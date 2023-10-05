import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { MessagesRepository } from './messages.repository';

@Module({
  controllers: [MessagesController],
  /**
   * Providers are essentially things that can be used
   * by other classes in dependency injection
   */
  providers: [MessagesService, MessagesRepository],
})
export class MessagesModule {}
