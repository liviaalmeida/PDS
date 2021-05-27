import "reflect-metadata";
import { Connection, createConnection } from "typeorm";
import { UserDto } from "../dto/userDto";
import { User } from '../entity/user';
import { UserRepository } from "../repository/userRepository";

export class UserService {
  async createUser(user:UserDto) {
    const connection: Connection = await createConnection()
    const userRepository = new UserRepository(connection)
    await userRepository.createUser(user.firstName, user.lastName, user.age)
    await connection.close()
  }

  async findAllUsers(): Promise<Array<UserDto>> {
    const connection: Connection = await createConnection()
    const repository = connection.getRepository(User);
    const allUsers = await repository.find() as UserDto[];
    await connection.close()
    return allUsers
  }
}


