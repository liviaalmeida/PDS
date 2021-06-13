import { Length } from 'class-validator';
import {JsonProperty} from 'json-typescript-mapper';

export class LoginDto {
  @JsonProperty('email')
  @Length(5, 100)
  email: string;

  @JsonProperty('password')
  @Length(5, 100)
  password: string;

  public constructor() {
    this.email = '';
    this.password = '';
  }
}
