import { Length } from 'class-validator';
export class ClienteDto {
  @Length(2, 100)
  name: string;
  @Length(2, 100)
  cnpj: string;
  @Length(2, 100)
  email: string;
  @Length(2, 100)
  address: string;
  @Length(2, 100)
  userEmail: string;

  public constructor() {
    this.name = '';
    this.cnpj = '';
    this.email = '';
    this.address = '';
    this.userEmail = '';
  }
}
