import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { UsersService } from './users.service';

const scrypt = promisify(_scrypt);
@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signup(email: string, password: string) {
    // find if user exists
    const users = await this.userService.find(email);
    if (users.length !== 0) {
      throw new BadRequestException('Email already in use');
    }
    // Genearate salt
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    //  hash password and salt
    const result = salt + '.' + hash.toString('hex');
    // create user
    const user = this.userService.create(email, result);
    return user;
    // save it
  }
  async signin(email: string, password: string) {
    // check if user exists
    const [user] = await this.userService.find(email);

    if (!user) {
      throw new NotFoundException('user not found');
    }

    const [salt, storedHash] = user.password.split('.');

    /// generate hash of the user password

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('wrong username or password');
    }
    return user;
  }
}
