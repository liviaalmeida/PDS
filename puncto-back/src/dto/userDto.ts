export interface IUserProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export class UserDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;

  public constructor(props: IUserProps) {
    this.firstName = props.firstName;
    this.lastName = props.lastName;
    this.email = props.email;
    this.password = props.password;
  }
}
