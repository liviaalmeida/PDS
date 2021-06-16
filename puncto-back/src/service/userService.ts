import 'reflect-metadata';
import { injectable, inject } from 'inversify';
import { Logger } from 'tslog';

import { UserDto } from '../dto/userDto';
import { UserRepository } from '../repository/userRepository';
import { NotFoundException } from '../exceptions/NotFoundException';

const log: Logger = new Logger();

@injectable()
export class UserService {
  private _userRepositoy: UserRepository;

  public constructor(@inject(UserRepository) userRepositoy: UserRepository) {
    this._userRepositoy = userRepositoy;
  }

  async createUser(user: UserDto): Promise<void> {
    await this._userRepositoy.createUser(user);
  }

  async findByEmail(email: string): Promise<UserDto> {
    const user = await this._userRepositoy.findByEmail(email);
    if (!user) {
      log.error('User not found')
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findAllUsers(): Promise<Array<UserDto>> {
    const allUsers = await this._userRepositoy.findAllUsers();
    return allUsers;
  }
}
