import { Length } from 'class-validator';
export class ClienteRequestDto {
  @Length(2, 100)
  name: string;
  @Length(2, 100)
  cnpj: string;
  @Length(2, 100)
  email: string;
  @Length(2, 100)
  address: string;

  public constructor() {
    this.name = '';
    this.cnpj = '';
    this.email = '';
    this.address = '';
  }
}
