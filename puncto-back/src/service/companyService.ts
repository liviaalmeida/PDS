import "reflect-metadata";
import { injectable, inject } from "inversify";
import { CompanyDto } from "../dto/companyDto";

@injectable()
export class CompanyService {
    public constructor(
    ) {
    }


    async createCompany(company: CompanyDto): Promise<void> {
        //await this._userRepositoy.createUser(user)
    }
}


