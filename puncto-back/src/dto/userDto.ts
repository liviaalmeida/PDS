import { Length } from 'class-validator';

export class UserDto {
  @Length(5, 100)
  email: string;

  @Length(5, 100)
  password: string;

  public constructor() {
    this.email = '';
    this.password = '';
  }
}
