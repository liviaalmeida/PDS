import "reflect-metadata";
import { UserDto } from "../dto/userDto";
import { injectable, inject } from "inversify";
import { UserRepository } from "../repository/userRepository";

@injectable()
export class UserService {
    private _userRepositoy: UserRepository;

    public constructor(
        @inject(UserRepository) userRepositoy: UserRepository,
    ) {
        this._userRepositoy = userRepositoy;
    }


    async createUser(user: UserDto): Promise<void> {
        await this._userRepositoy.createUser(user)
    }

    async findAllUsers(): Promise<Array<UserDto>> {
        const allUsers = await this._userRepositoy.findAllUsers();
        return allUsers;
    }
}


