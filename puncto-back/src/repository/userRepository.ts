import "reflect-metadata";
import { Connection } from "typeorm";
import { UserDto } from "../dto/userDto";
import { User } from '../entity/user';

export class UserRepository {

  connection: Connection

  constructor(connection: Connection) {
    this.connection = connection
  }

  async createUser(firstName: string, lastName: string, age: number) {
    const repository = this.connection.getRepository(User);
    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.age = age;
    await repository.save(user);
  }

  async findAllUsers(): Promise<Array<UserDto>> {
    const repository = this.connection.getRepository(User);
    const allUsers = await repository.find() as UserDto[];
    console.log(allUsers)
    return allUsers
  }
}


