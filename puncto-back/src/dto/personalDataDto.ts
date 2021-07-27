import { Length } from 'class-validator';

export class PersonalDataDto {
  @Length(5, 100)
  name: string;

  @Length(5, 100)
  cnpj: string;

  @Length(5, 100)
  address: string;

  public constructor() {
    this.name = '';
    this.cnpj = '';
    this.address = '';
  }
}
