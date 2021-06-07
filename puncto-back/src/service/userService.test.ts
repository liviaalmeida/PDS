import { UserDto, IUserProps } from "../dto/userDto";
import { UserRepository } from "../repository/userRepository";
import { UserService } from "./userService";
import { container } from '../inversify.config';

describe("User service", () => {
    let userService: UserService
    let mockAllUsers: UserDto[]
    const mockUserRepository: UserRepository = container.get(UserRepository);

    const getUser = (props: IUserProps): UserDto => {
        return new UserDto(props)
    }

    beforeAll(() => {
        userService = new UserService(mockUserRepository)
        mockAllUsers = [getUser({
            firstName: "Gabriel",
            lastName: "Chaves",
            email: "gabrielchaves@gmail.com",
            password: "123456",
        }), getUser({
            firstName: "Philipe",
            lastName: "Atela",
            email: "philipe@gmail.com",
            password: "123456",
        })]
    })


    it("createUser should call userRepository.createUser", () => {
        const spyUserRepository = jest.spyOn(mockUserRepository, 'createUser');
        userService.createUser(getUser({
            firstName: "Gabriel",
            lastName: "Chaves",
            email: "gabrielchaves@gmail.com",
            password: "123456",
        }))
        expect(spyUserRepository).toHaveBeenCalledTimes(1);
    });

    it("findAllUsers should call userRepository.findAllUsers", async () => {
        const spyUserRepository = jest.spyOn(mockUserRepository, 'findAllUsers').mockImplementation((): Promise<Array<UserDto>> => {
            return Promise.resolve(mockAllUsers);
        });

        const users = await userService.findAllUsers();
        expect(spyUserRepository).toHaveBeenCalledTimes(1);
        expect(users).toHaveLength(2);
        expect(users).toContainEqual(getUser({
            firstName: "Gabriel",
            lastName: "Chaves",
            email: "gabrielchaves@gmail.com",
            password: "123456",
        }))
    });
});