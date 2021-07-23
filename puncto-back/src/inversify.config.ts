import { Container } from 'inversify';
import { UserRepository } from './repository/userRepository';
import { UserService } from './service/userService';
import { AuthService } from './service/authService';
import { ClienteService } from './service/clienteService';
import { ClienteRepository } from './repository/clienteRepository';
import { PontoService } from './service/pontoService';
import { PontoRepository } from './repository/pontoRepository';

const container = new Container();
container.bind<UserService>(UserService).to(UserService);
container.bind<AuthService>(AuthService).to(AuthService);
container.bind<UserRepository>(UserRepository).to(UserRepository);
container.bind<ClienteService>(ClienteService).to(ClienteService);
container.bind<ClienteRepository>(ClienteRepository).to(ClienteRepository);
container.bind<PontoService>(PontoService).to(PontoService);
container.bind<PontoRepository>(PontoRepository).to(PontoRepository);

export { container };
