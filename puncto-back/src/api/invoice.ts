import express from 'express';
import { Request, Response } from 'express';
import { container } from '../inversify.config';
import { InvoiceService } from '../service/invoiceService';
import { validate } from '../middlewares/validation';
import { authMiddleware } from '../middlewares/authentication';
import { InvoiceDto } from '../dto/invoiceDto';

const router = express.Router();
const invoiceService = container.get(InvoiceService);

router.use('/', authMiddleware)

router.post('/', validate(InvoiceDto), async (req: Request, res: Response) => {
  try {
    const invoice = req.body as InvoiceDto;
    const userEmail = req.userEmail;

    const newInvoiceId = await invoiceService.save(userEmail, invoice);
    res.status(201).send(newInvoiceId);
  } catch (err) {

    return res.status(500).json('Some unexpected error happened while creating an invoice.');
  }
});

router.get('/', async (req: Request, res: Response) => {
  try {
    const userEmail = req.userEmail

    const invoices = await invoiceService.find(userEmail);

    res.status(200).json(invoices);
  } catch (err) {

    return res.status(500).json('Some unexpected error happened while finding invoice list.');
  }
});

router.get('/id/:id', async (req: Request, res: Response) => {
  try {
    const userEmail = req.userEmail
    const id = req.params.id;

    const invoice = await invoiceService.findOne(userEmail, id);

    res.status(200).json(invoice);
  } catch (err) {

    return res.status(500).json('Some unexpected error happened while finding an invoice.');
  }
});

export default router;
