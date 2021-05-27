export class UserDto {
    firstName: string;
    lastName: string;
    age: number;

    public constructor(firstName: string, lastName: string, age: number) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
    }
}
