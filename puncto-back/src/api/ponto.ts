import express from 'express';
import { Request, Response } from 'express';
import { container } from '../inversify.config';
import { validate } from '../middlewares/validation';
import { authMiddleware } from '../middlewares/authentication';
import { PontoInicialRequest } from '../dto/pontoInicialRequest';
import { PontoService } from '../service/pontoService';
import { PontoDto } from '../dto/pontoDto';
import { PontoRequest } from '../dto/pontoRequest';

const router = express.Router();

router.use('/', authMiddleware)

router.post('/', validate(PontoInicialRequest), async (req: Request, res: Response) => {
    try {
        const pontoInicialRequest = req.body as PontoInicialRequest;
        const userEmail = req.userEmail;

        const pontoService = container.get(PontoService);

        let ponto = await pontoService.save(userEmail, pontoInicialRequest);
        res.status(201).send(ponto);
    } catch (err) {
        return res.status(500).json('Some unexpected error happened while creating the ponto.');
    }
});

router.put('/', validate(PontoRequest), async (req: Request, res: Response) => {
    try {
        const pontoRequest = req.body as PontoRequest;
        const userEmail = req.userEmail;

        const pontoService = container.get(PontoService);

        const ponto = await pontoService.update(userEmail, pontoRequest);
        res.status(201).send(ponto);
    } catch (err) {
        return res.status(500).json('Some unexpected error happened while updating the ponto.');
    }
});

router.get('/:timestamp', async (req: Request, res: Response) => {
    try {
        const userEmail: string = req.userEmail;
        const timestamp: number = Number(req.params.timestamp);

        const pontoService = container.get(PontoService);

        var pontos: Array<PontoDto> = await pontoService.find(userEmail, timestamp);
        res.status(200).json(pontos);
    } catch (err) {
        return res.status(500).json('Some unexpected error happened while getting the ponto.');
    }
});

router.delete('/:pontoId', async (req: Request, res: Response) => {
    try {
        const pontoId: string = req.params.pontoId;

        const pontoService = container.get(PontoService);

        await pontoService.delete(pontoId);
        res.status(204).send();
    } catch (err) {
        return res.status(500).json('Some unexpected error happened while deleting the ponto.');
    }
});
export default router;
