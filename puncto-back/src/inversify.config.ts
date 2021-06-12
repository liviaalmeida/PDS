import { Container } from 'inversify';
import { UserRepository } from './repository/userRepository';
import { UserService } from './service/userService';
import { AuthService } from './service/authService';
import { CompanyService } from './service/companyService';
import { CompanyRepository } from './repository/companyRepository';

const container = new Container();
container.bind<UserService>(UserService).to(UserService);
container.bind<AuthService>(AuthService).to(AuthService);
container.bind<UserRepository>(UserRepository).to(UserRepository);
container.bind<CompanyService>(CompanyService).to(CompanyService);
container.bind<CompanyRepository>(CompanyRepository).to(CompanyRepository);

export { container };
