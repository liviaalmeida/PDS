import { Container } from "inversify";
import { UserRepository } from "./repository/userRepository";
import { UserService } from "./service/userService";

const container = new Container();
container.bind<UserService>(UserService).to(UserService)
container.bind<UserRepository>(UserRepository).to(UserRepository)

export { container };