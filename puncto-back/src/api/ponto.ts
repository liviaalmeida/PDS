import express from 'express';
import { Request, Response } from 'express';
import { container } from '../inversify.config';
import { validate } from '../middlewares/validation';
import { authMiddleware } from '../middlewares/authentication';
import { PontoDto } from '../dto/pontoDto';
import { PontoService } from '../service/pontoService';

const router = express.Router();

router.use('/', authMiddleware)

router.post('/', validate(PontoDto), async (req: Request, res: Response) => {
    try {
        const pontoDto = req.body as PontoDto;

        const pontoService = container.get(PontoService);

        await pontoService.save(pontoDto);
        res.status(201).send();
    } catch (err) {
        return res.status(500).json('Some unexpected error happened while saving the ponto.');
    }
});
export default router;
