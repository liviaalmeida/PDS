import express from 'express'
import { Request, Response } from 'express'
import { container } from '../inversify.config';
import { CompanyDto } from '../dto/companyDto';
import { CompanyService } from '../service/companyService';

const router = express.Router()

const validCompany = (company: CompanyDto): Boolean => {
    if (company.email && company.cnpj && company.endereco && company.nome)
        return true

    return false
}

router.post('/', async (req: Request, res: Response) => {
    try {
        const company = req.body as CompanyDto

        if (!validCompany(company))
            throw new InvalidCompanyRequestError()

        const companyService = container.get(CompanyService)

        await companyService.createCompany(company)
        res.status(201)
    } catch (err) {
        if (err instanceof InvalidCompanyRequestError)
            res.status(err.responseStatusCode).json(err.message)

        res.status(500).json("Some unexpected error happened while creating a company.");
    }
})
export default router
