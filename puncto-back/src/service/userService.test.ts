import { UserDto } from "../dto/userDto";
import { UserRepository } from "../repository/userRepository";
import { UserService } from "./userService";
import { container } from '../inversify.config';

describe("User service", () => {
    let userService: UserService
    let mockAllUsers: UserDto[]
    const mockUserRepository: UserRepository = container.get(UserRepository);

    const getUser = (firstName: string, lastName: string, age: number): UserDto => {
        return new UserDto(firstName, lastName, age)
    }

    beforeAll(() => {
        userService = new UserService(mockUserRepository)
        mockAllUsers = [getUser("Gabriel", "Chaves", 20), getUser("Nome", "Sobrenome", 25)]
    })


    it("createUser should call userRepository.createUser", () => {
        let spyUserRepository = jest.spyOn(mockUserRepository, 'createUser');
        userService.createUser(getUser("Gabriel", "Chaves", 20))
        expect(spyUserRepository).toHaveBeenCalledTimes(1);
    });

    it("findAllUsers should call userRepository.findAllUsers", async () => {
        let spyUserRepository = jest.spyOn(mockUserRepository, 'findAllUsers').mockImplementation((): Promise<Array<UserDto>> => {
            return Promise.resolve(mockAllUsers);
        });

        let users = await userService.findAllUsers();
        expect(spyUserRepository).toHaveBeenCalledTimes(1);
        expect(users).toHaveLength(2);
        expect(users).toContainEqual(getUser("Gabriel", "Chaves", 20))
    });
});