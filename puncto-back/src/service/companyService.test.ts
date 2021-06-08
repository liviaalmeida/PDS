import { CompanyService } from "./companyService";
import { CompanyDto, ICompanyProps } from "../dto/companyDto";
import InvalidCompanyRequestError from "../exceptions/InvalidCompanyRequestError";

describe("Company service", () => {
    let companyService
    let mockCompanyRepository
    beforeAll(() => {
        mockCompanyRepository = {
            createCompany: jest.fn()
        }
        companyService = new CompanyService(mockCompanyRepository)
    })

    const getCompany = (props: ICompanyProps) => {
        return new CompanyDto(props)
    }
    it("Should call createCompany at companyRepository ", async () => {
        const company = getCompany({
            name: "inter",
            cnpj: "123903843",
            email: "banco@inter.com",
            address: "rua pernambuco, 231, savassi",
        })
        await companyService.createCompany(company);

        expect(mockCompanyRepository.createCompany).toHaveBeenCalledTimes(1)
        expect(mockCompanyRepository.createCompany).toHaveBeenCalledWith(company)
    })
});