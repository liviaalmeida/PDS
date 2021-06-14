import { Length } from 'class-validator';

export class UserDto {
  @Length(2, 100)
  firstName: string;

  @Length(2, 100)
  lastName: string;

  @Length(5, 100)
  email: string;

  @Length(5, 100)
  password: string;

  public constructor() {
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.password = '';
  }
}
