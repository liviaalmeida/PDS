import { Length } from 'class-validator';
import {JsonProperty} from 'json-typescript-mapper';

export class UserDto {
  @JsonProperty('firstName')
  @Length(2, 100)
  firstName: string;

  @JsonProperty('lastName')
  @Length(2, 100)
  lastName: string;

  @JsonProperty('email')
  @Length(5, 100)
  email: string;

  @JsonProperty('password')
  @Length(5, 100)
  password: string;

  public constructor() {
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.password = '';
  }
}
