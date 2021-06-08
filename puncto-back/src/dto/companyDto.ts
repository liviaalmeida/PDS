export interface ICompanyProps {
    name: string;
    cnpj: string;
    email: string;
    address: string;
}

export class CompanyDto {
    name: string;
    cnpj: string;
    email: string;
    address: string;

    public constructor(props: ICompanyProps) {
        this.name = props.name;
        this.cnpj = props.cnpj;
        this.email = props.email;
        this.address = props.address;
    }
}
