import express from 'express';
import { Request, Response } from 'express';
import { container } from '../inversify.config';
import { CompanyDto } from '../dto/companyDto';
import { CompanyService } from '../service/companyService';
import InvalidCompanyRequestError from '../exceptions/InvalidCompanyRequestError';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const company = req.body as CompanyDto;

    const companyService = container.get(CompanyService);

    await companyService.createCompany(company);
    res.status(201).send();
  } catch (err) {
    if (err instanceof InvalidCompanyRequestError) return res.status(err.statusCode).json(err.message);

    return res.status(500).json('Some unexpected error happened while creating a company.');
  }
});
export default router;
