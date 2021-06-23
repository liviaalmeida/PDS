import { CompanyService } from './companyService';
import { CompanyDto } from '../dto/companyDto';

describe('Company service', () => {
  let companyService;
  let mockCompanyRepository;
  beforeAll(() => {
    mockCompanyRepository = {
      createCompany: jest.fn(),
    };
    companyService = new CompanyService(mockCompanyRepository);
  });


  it('Should call createCompany at companyRepository ', async () => {
    const company = {
      name: 'inter',
      cnpj: '123903843',
      email: 'banco@inter.com',
      address: 'rua pernambuco, 231, savassi',
    } as CompanyDto;
    await companyService.createCompany(company);

    expect(mockCompanyRepository.createCompany).toHaveBeenCalledTimes(1);
    expect(mockCompanyRepository.createCompany).toHaveBeenCalledWith(company);
  });
});
