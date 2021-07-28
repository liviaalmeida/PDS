import { Length, ValidateIf } from 'class-validator';

export class PersonalDataDto {
  @Length(5, 100)
  name: string;

  @Length(5, 100)
  cnpj: string;

  @Length(5, 100)
  @ValidateIf(o => false)
  email?: string;

  @Length(5, 100)
  address: string;

  @Length(2, 100)
  addressTwo: string;
  @Length(2, 100)
  addressThree: string;

  public constructor() {
    this.name = '';
    this.cnpj = '';
    this.email = '';
    this.address = '';
    this.addressTwo = '';
    this.addressThree = '';
  }
}
