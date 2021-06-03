import { Container } from "inversify";
import { UserRepository } from "./repository/userRepository";
import { UserService } from "./service/userService";
import { AuthService } from "./service/authService";

const container = new Container();
container.bind<UserService>(UserService).to(UserService)
container.bind<AuthService>(AuthService).to(AuthService)
container.bind<UserRepository>(UserRepository).to(UserRepository)

export { container };