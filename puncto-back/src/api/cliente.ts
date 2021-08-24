import express from 'express';
import { Request, Response } from 'express';
import { container } from '../inversify.config';
import { ClienteService } from '../service/clienteService';
import { validate } from '../middlewares/validation';
import { authMiddleware } from '../middlewares/authentication';
import { ClienteRequestDto } from '../dto/clienteRequestDto';
import InvalidClienteRequestError from '../exceptions/InvalidClienteRequestError';
import { UpdateClienteRequestDto } from '../dto/updateClienteRequestDto';

interface ClientRequest extends Request {
  query: {
    search?: string
  }
}

const router = express.Router();
const clienteService = container.get(ClienteService);

router.use('/', authMiddleware)

router.post('/', validate(ClienteRequestDto), async (req: Request, res: Response) => {
  try {
    const cliente = req.body as ClienteRequestDto;
    const userEmail = req.userEmail;

    const newClienteId = await clienteService.save(userEmail, cliente);
    res.status(201).send(newClienteId);
  } catch (err) {
    if (err instanceof InvalidClienteRequestError) return res.status(err.statusCode).json(err.message);

    return res.status(500).json('Some unexpected error happened while creating a cliente.');
  }
});

router.get('/', async (req: ClientRequest, res: Response) => {
  try {
    const userEmail = req.userEmail

    const clientes = await clienteService.find(userEmail, req.query.search);

    res.status(200).json(clientes);
  } catch (err) {
    if (err instanceof InvalidClienteRequestError) return res.status(err.statusCode).json(err.message);

    return res.status(500).json('Some unexpected error happened while finding a client.');
  }
});

router.delete('/:clienteId', async (req: Request, res: Response) => {
  try {
    const clienteId = req.params.clienteId;
    await clienteService.delete(clienteId);
    res.status(204).send();
  } catch (err) {
    return res.status(500).json('Some unexpected error happened while deleting the cliente.');
  }
});

router.put('/', validate(UpdateClienteRequestDto), async (req: Request, res: Response) => {
  try {
    const clienteRequest = req.body as UpdateClienteRequestDto;

    const clienteService = container.get(ClienteService);
    const cliente = await clienteService.update(clienteRequest);

    res.status(201).send(cliente);
  } catch (err) {
    return res.status(500).json('Some unexpected error happened while updating the ponto.');
  }
});

export default router;
