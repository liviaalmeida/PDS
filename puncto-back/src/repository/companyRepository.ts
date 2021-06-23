import 'reflect-metadata';
import { Connection, getConnection, Repository } from 'typeorm';
import { injectable } from 'inversify';
import { Company } from '../entity/Company';
import { CompanyDto } from '../dto/companyDto';

@injectable()
export class CompanyRepository {
  private getCompanyRepository(): Repository<Company> {
    const connection: Connection = getConnection();
    return connection.getRepository(Company);
  }

  async createCompany(companyDto: CompanyDto): Promise<void> {
    const repository = this.getCompanyRepository();
    const company = new Company();
    company.name = companyDto.name;
    company.cnpj = companyDto.cnpj;
    company.email = companyDto.email;
    company.address = companyDto.address;

    await repository.save(company);
  }
}
