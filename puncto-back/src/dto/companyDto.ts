export interface ICompanyProps {
    nome: string;
    cnpj: string;
    email: string;
    endereco: string;
}

export class CompanyDto {
    nome: string;
    cnpj: string;
    email: string;
    endereco: string;

    public constructor(props: ICompanyProps) {
        this.nome = props.nome;
        this.cnpj = props.cnpj;
        this.email = props.email;
        this.endereco = props.endereco;
    }
}
