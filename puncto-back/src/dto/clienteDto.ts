export class ClienteDto {

    id: number;
    name: string;
    cnpj: string;
    email: string;
    address: string;
    addressTwo: string;
    addressThree: string;

    public constructor() {
        this.id = 0;
        this.name = '';
        this.cnpj = '';
        this.email = '';
        this.address = '';
        this.addressTwo = '';
        this.addressThree = '';
    }
}
