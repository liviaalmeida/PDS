import express from 'express';
import { Request, Response } from 'express';
import { container } from '../inversify.config';
import { ClienteService } from '../service/clienteService';
import { validate } from '../middlewares/validation';
import { authMiddleware } from '../middlewares/authentication';
import { ClienteRequestDto } from '../dto/clienteRequestDto';
import InvalidClienteRequestError from '../exceptions/InvalidClienteRequestError';

const router = express.Router();
const clienteService = container.get(ClienteService);

router.use('/', authMiddleware)

router.post('/', validate(ClienteRequestDto), async (req: Request, res: Response) => {
  try {
    const cliente = req.body as ClienteRequestDto;
    const userEmail = req.userEmail;

    let newClienteId = await clienteService.create(userEmail, cliente);
    res.status(201).send(newClienteId);
  } catch (err) {
    if (err instanceof InvalidClienteRequestError) return res.status(err.statusCode).json(err.message);

    return res.status(500).json('Some unexpected error happened while creating a cliente.');
  }
});

router.get('/', async (req: Request, res: Response) => {
  try {
    const userEmail = req.userEmail

    const clientes = await clienteService.findAllClientes(userEmail)

    res.status(200).json(clientes);
  } catch (err) {
    if (err instanceof InvalidClienteRequestError) return res.status(err.statusCode).json(err.message);

    return res.status(500).json('Some unexpected error happened while creating a cliente.');
  }
});

export default router;
