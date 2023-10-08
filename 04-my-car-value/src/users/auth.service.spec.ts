import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('Auth Service', () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    // create fake copy of users service // MOCK
    const users: User[] = [];
    // fakeUsersService = {
    //   find: () => Promise.resolve([]),
    //   create: (email: string, password: string) =>
    //     Promise.resolve({ id: 1, email, password } as User),
    // };
    fakeUsersService = {
      find: (email: string) => {
        const filteredUsers = users.filter((u) => u.email === email);
        return Promise.resolve(filteredUsers);
      },
      create: (email: string, password: string) => {
        const user = {
          id: Math.floor(Math.random() * 9999),
          email,
          password,
        } as User;
        users.push(user);
        return Promise.resolve(user);
      },
    };

    const module = await Test.createTestingModule({
      // providers: [AuthService], // breaks
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  it('creates a new user with a salted and hashed password', async () => {
    const user = await service.signup('test@mail.com', 'asdf');
    expect(user.password).not.toEqual('asdf');

    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws an error if user signs up with email that is in use', async () => {
    // modify mock service implementation
    // fakeUsersService.find = () =>
    //   Promise.resolve([{ id: 1, email: 'a', password: '1' } as User]);

    await service.signup('test@mail.com', 'asdf');

    const signupPromise = service.signup('test@mail.com', 'asdf'); // get the promise (without await)

    await expect(signupPromise).rejects.toThrow(BadRequestException);
  });

  it('throws if signin is called with an unregistered email', async () => {
    const signinPromise = service.signin('test@mail.com', 'asdf');

    await expect(signinPromise).rejects.toThrow(NotFoundException);
  });

  it('throws if an invalid password is provided', async () => {
    // fakeUsersService.find = () =>
    //   Promise.resolve([
    //     { email: 'test@mail.com', password: 'actualPassword' } as User,
    //   ]);

    await service.signup('test@mail.com', 'actualPassword');

    const signinPromise = service.signin('test@mail.com', 'attemptPassword');

    await expect(signinPromise).rejects.toThrow(BadRequestException);
  });

  it('returns a user if correct password is provided', async () => {
    await service.signup('test@mail.com', 'actualPassword');

    const user = await service.signin('test@mail.com', 'actualPassword');
    expect(user).toBeDefined();
  });
});
