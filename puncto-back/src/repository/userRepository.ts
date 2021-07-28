import 'reflect-metadata';
import { Connection, getConnection, Repository } from 'typeorm';
import { Logger } from "tslog";
import { injectable } from 'inversify';

import { UserDto } from '../dto/userDto';
import { User } from '../entity/User';
import { DatabaseErrorException } from '../exceptions/DatabaseErrorException';
import { PersonalDataDto } from '../dto/personalDataDto';

const log: Logger = new Logger();

@injectable()
export class UserRepository {
  private getUserRepository(): Repository<User> {
    const connection: Connection = getConnection();
    return connection.getRepository(User);
  }

  async createUser(props: UserDto): Promise<void> {
    const repository = this.getUserRepository();
    const user = new User();
    user.email = props.email;
    user.password = props.password;

    // set additional fields to empty initially
    user.address = '';
    user.addressTwo = '';
    user.addressThree = '';
    user.name = '';
    user.cnpj = '';

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

  async findByEmail(email: string): Promise<UserDto | undefined> {
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

  async editUserData(email: string, payload: PersonalDataDto): Promise<PersonalDataDto> {
    const repository = this.getUserRepository();

    try {
    const user = await repository.findOne({ where: { email } });
    const updatedEntity = await repository.save({
      ...user,
      ...payload
    });

    return {
      name: updatedEntity.name,
      cnpj: updatedEntity.cnpj,
      address: updatedEntity.address,
      addressTwo: updatedEntity.addressTwo,
      addressThree: updatedEntity.addressThree,
    };
    } catch (error) {
      log.error(error);
      throw new DatabaseErrorException('Failed to edit user in database.');
    }
  }

  async getUserData(email: string): Promise<PersonalDataDto> {
    const repository = this.getUserRepository();

    try {
      const user = await repository.findOne({ where: { email } });
      log.debug('Found user: ', user);
      if (!user) {
        throw new Error('User not found.');
      }

      return {
        name: user.name,
        cnpj: user.cnpj,
        address: user.address,
        addressTwo: user.addressTwo,
        addressThree: user.addressThree,
      };
    } catch (error) {
      log.error(error);
      throw new DatabaseErrorException('Error finding user data in database.');
    }
  }
}
