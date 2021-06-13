export interface ILoginProps {
  email: string;
  password: string;
}

export class LoginDto {
  email: string;
  password: string;

  public constructor(props: ILoginProps) {
    this.email = props.email;
    this.password = props.password;
  }
}
