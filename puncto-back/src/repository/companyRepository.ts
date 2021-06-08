import "reflect-metadata";
import { Connection, getConnection, Repository } from "typeorm";
import { injectable } from "inversify";
import { ICompanyProps } from "../dto/companyDto";
import { Company } from "../entity/Company";

@injectable()
export class CompanyRepository {
    private getCompanyRepository(): Repository<Company> {
        const connection: Connection = getConnection()
        return connection.getRepository(Company);
    }

    async createCompany(props: ICompanyProps): Promise<void> {
        const repository = this.getCompanyRepository();
        const company = new Company();
        company.name = props.name;
        company.cnpj = props.cnpj;
        company.email = props.email;
        company.address = props.address;

        await repository.save(company);
    }
}


