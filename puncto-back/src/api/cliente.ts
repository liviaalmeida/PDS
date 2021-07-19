import express from 'express';
import { Request, Response } from 'express';
import { container } from '../inversify.config';
import { ClienteService } from '../service/clienteService';
import { validate } from '../middlewares/validation';
import { authMiddleware } from '../middlewares/authentication';
import { ClienteDto } from '../dto/clienteDto';
import InvalidClienteRequestError from '../exceptions/InvalidClienteRequestError';

const router = express.Router();

router.use('/', authMiddleware)

router.post('/', validate(ClienteDto), async (req: Request, res: Response) => {
  try {
    const cliente = req.body as ClienteDto;

    const clienteService = container.get(ClienteService);

    await clienteService.create(cliente);
    res.status(201).send();
  } catch (err) {
    if (err instanceof InvalidClienteRequestError) return res.status(err.statusCode).json(err.message);

    return res.status(500).json('Some unexpected error happened while creating a cliente.');
  }
});
export default router;
