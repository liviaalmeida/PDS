export class ClienteDto {

    id: string;
    name: string;
    cnpj: string;
    email: string;
    address: string;
    addressTwo: string;
    addressThree: string;

    public constructor() {
        this.id = '';
        this.name = '';
        this.cnpj = '';
        this.email = '';
        this.address = '';
        this.addressTwo = '';
        this.addressThree = '';
    }
}
