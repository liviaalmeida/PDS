import 'reflect-metadata';
import { injectable, inject } from 'inversify';
import { CompanyDto } from '../dto/companyDto';
import InvalidCompanyRequestError from '../exceptions/InvalidCompanyRequestError';
import { CompanyRepository } from '../repository/companyRepository';

@injectable()
export class CompanyService {
  private _companyRepositoy: CompanyRepository;
  public constructor(@inject(CompanyRepository) companyRepository: CompanyRepository) {
    this._companyRepositoy = companyRepository;
  }

  validCompany(company: CompanyDto): boolean {
    if (company.email && company.cnpj && company.address && company.name) return true;

    return false;
  }

  async createCompany(company: CompanyDto): Promise<void> {
    if (!this.validCompany(company)) throw new InvalidCompanyRequestError();

    await this._companyRepositoy.createCompany(company);
  }
}
