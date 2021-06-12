import 'reflect-metadata';
import { Connection, getConnection, Repository } from 'typeorm';
import { UserDto, IUserProps } from '../dto/userDto';
import { User } from '../entity/User';
import { injectable } from 'inversify';

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

    await repository.save(user);
  }

  async findAllUsers(): Promise<Array<UserDto>> {
    const repository = this.getUserRepository();
    const allUsers = (await repository.find()) as UserDto[];
    console.log(allUsers);
    return allUsers;
  }

  async findByEmail(email: string): Promise<UserDto> {
    const repository = this.getUserRepository();

    const user = (await repository.findOne({ where: { email } })) as UserDto;
    return user;
  }
}
