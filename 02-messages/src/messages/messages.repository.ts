import { Injectable } from '@nestjs/common';
import { readFile, writeFile } from 'fs/promises';

@Injectable()
export class MessagesRepository {
  async findOne(id: string) {
    const contents = await readFile('messages.json', 'utf-8');
    const messages = JSON.parse(contents);
    return messages[id];
  }

  async findAll() {
    const contents = await readFile('messages.json', 'utf-8');
    const messages = JSON.parse(contents);
    return messages;
  }

  async create(message: string) {
    const contents = await readFile('messages.json', 'utf-8');
    const messages = JSON.parse(contents);

    let id = Math.floor(Math.random() * 999);
    while (id === 0 || messages[id]) {
      id = Math.floor(Math.random() * 999);
    }

    console.log(`ID: ${id}`);

    messages[id] = { id, content: message };

    await writeFile('messages.json', JSON.stringify(messages));

    return message;
  }
}
