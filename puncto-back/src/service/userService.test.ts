import { UserDto } from '../dto/userDto';
import { UserRepository } from '../repository/userRepository';
import { UserService } from './userService';
import { container } from '../inversify.config';

describe('User service', () => {
  let userService: UserService;
  let mockAllUsers: UserDto[];
  const mockUserRepository: UserRepository = container.get(UserRepository);

  beforeEach(() => {
    jest.clearAllMocks();
  })

  beforeAll(() => {
    userService = new UserService(mockUserRepository);
    mockAllUsers = [
      {
        firstName: 'Gabriel',
        lastName: 'Chaves',
        email: 'gabrielchaves@gmail.com',
        password: '123456',
      },
      {
        firstName: 'Philipe',
        lastName: 'Atela',
        email: 'philipe@gmail.com',
        password: '123456',
      },
    ];
  });

  it('createUser should call userRepository.createUser', () => {
    const spyUserRepository = jest.spyOn(mockUserRepository, 'createUser');
    userService.createUser({
        firstName: 'Gabriel',
        lastName: 'Chaves',
        email: 'gabrielchaves@gmail.com',
        password: '123456',
      },
    );
    expect(spyUserRepository).toHaveBeenCalledTimes(1);
  });

  it('findAllUsers should call userRepository.findAllUsers', async () => {
    const spyUserRepository = jest
      .spyOn(mockUserRepository, 'findAllUsers')
      .mockImplementation((): Promise<Array<UserDto>> => {
        return Promise.resolve(mockAllUsers);
      });

    const users = await userService.findAllUsers();
    expect(spyUserRepository).toHaveBeenCalledTimes(1);
    expect(users).toHaveLength(2);
    expect(users).toContainEqual(
      {
        firstName: 'Gabriel',
        lastName: 'Chaves',
        email: 'gabrielchaves@gmail.com',
        password: '123456',
      },
    );
  });

  it('findByEmail should call userRepository.findByEmail', async () => {
    const spyUserRepository = jest
      .spyOn(mockUserRepository, 'findByEmail')
      .mockImplementation((): Promise<UserDto> => {
        return Promise.resolve({
          firstName: 'Philipe',
          lastName: 'Atela',
          email: 'philipe@gmail.com',
          password: '123456',
        });
      });

    const users = await userService.findByEmail('philipe@gmail.com');
    expect(spyUserRepository).toHaveBeenCalledTimes(1);
    expect(users).toEqual(
      {
        firstName: 'Philipe',
        lastName: 'Atela',
        email: 'philipe@gmail.com',
        password: '123456',
      },
    );
  });

  it('findByEmail should throw on user not found', async () => {
    jest
      .spyOn(mockUserRepository, 'findByEmail')
      .mockImplementation((): Promise<UserDto | undefined> => {
        return Promise.resolve(undefined);
      });

    try {
      await userService.findByEmail('nonexistingemail@gmail.com');
      expect(true).toBe(false);
    } catch(error) {
      expect(error.message).toBe('User not found');
    }
  });
});
