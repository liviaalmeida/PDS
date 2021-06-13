import 'reflect-metadata';
import { Connection, getConnection, Repository } from 'typeorm';
import { Logger } from "tslog";
import { injectable } from 'inversify';

import { UserDto, IUserProps } from '../dto/userDto';
import { User } from '../entity/User';
import { DatabaseErrorException } from '../exceptions/DatabaseErrorException';

const log: Logger = new Logger();

@injectable()
export class UserRepository {
  private getUserRepository(): Repository<User> {
    const connection: Connection = getConnection();
    return connection.getRepository(User);
  }

  async createUser(props: IUserProps): Promise<void> {
    const repository = this.getUserRepository();
    const user = new User();
    user.firstName = props.firstName;
    user.lastName = props.lastName;
    user.email = props.email;
    user.password = props.password;

    try {
      await repository.save(user);
    } catch (error) {
      log.error(error);
      throw new DatabaseErrorException('Failed to save user to database.');
    }
  }

  async findAllUsers(): Promise<Array<UserDto>> {
    const repository = this.getUserRepository();

    try {
      const allUsers = (await repository.find()) as UserDto[];
      log.debug('Found users: ', allUsers);
      return allUsers;
    } catch (error) {
      log.error(error);
      throw new DatabaseErrorException('Error finding all users in database.');
    }
  }

  async findByEmail(email: string): Promise<UserDto> {
    const repository = this.getUserRepository();

    try {
      const user = (await repository.findOne({ where: { email } })) as UserDto;
      log.debug('Found user: ', user);
      return user;
    } catch (error) {
      log.error(error);
      throw new DatabaseErrorException('Error finding user in database.');
    }
  }
}
