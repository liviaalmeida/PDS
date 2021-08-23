import { IsNotEmpty, Length } from 'class-validator';
export class UpdateClienteRequestDto {
    @IsNotEmpty()
    id: string;
    @Length(2, 100)
    name: string;
    @Length(2, 100)
    cnpj: string;
    @Length(2, 100)
    email: string;
    @Length(2, 100)
    address: string;
    @Length(2, 100)
    addressTwo: string;
    @Length(2, 100)
    addressThree: string;
}
