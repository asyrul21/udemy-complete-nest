import { MessagesRepository } from './messages.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessagesService {
  messagesRepo: MessagesRepository;

  constructor(messagesRepo: MessagesRepository) {
    /**
     * Service Class is creating its own dependencies.
     * DO NOT DO THIS ON REAL APPS
     *
     * USE DEPENDENCY INJECTION
     */
    // this.messagesRepo = new MessagesRepository();
    this.messagesRepo = messagesRepo;
  }

  findOne(id: string) {
    return this.messagesRepo.findOne(id);
  }

  findAll() {
    return this.messagesRepo.findAll();
  }

  create(content: string) {
    return this.messagesRepo.create(content);
  }
}
