import "reflect-metadata";
import { Connection, getConnection, Repository } from "typeorm";
import { UserDto } from "../dto/userDto";
import { User } from '../entity/user';
import { injectable } from "inversify";

@injectable()
export class UserRepository {
  private getUserRepository(): Repository<User> {
    const connection: Connection = getConnection()
    return connection.getRepository(User);
  }

  async createUser(firstName: string, lastName: string, age: number) {
    const repository = this.getUserRepository();
    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.age = age;
    await repository.save(user);
  }

  async findAllUsers(): Promise<Array<UserDto>> {
    const repository = this.getUserRepository();
    const allUsers = await repository.find() as UserDto[];
    console.log(allUsers)
    return allUsers
  }
}


