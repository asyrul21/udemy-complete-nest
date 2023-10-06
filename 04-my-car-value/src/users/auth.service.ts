import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
// hash and salt
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string) {
    // see if email is in use
    const users = await this.usersService.find(email);
    if (users.length > 0) {
      throw new BadRequestException('email already exists.');
    }

    // hash and salt users password
    const salt = randomBytes(8).toString('hex'); // 16 characters
    const hash = (await scrypt(password, salt, 32)) as Buffer; // 32 characters
    const resultPassword = salt + '.' + hash.toString('hex'); // join with seperator character

    // create new user and save
    const user = await this.usersService.create(email, resultPassword);

    // return the user
    return user;
  }

  async signin(email: string, password: string) {
    const [user] = await this.usersService.find(email);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('Incorrect password.');
    }

    return user;
  }
}
