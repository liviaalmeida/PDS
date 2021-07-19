import 'reflect-metadata';
import { injectable, inject } from 'inversify';
import { PontoDto } from '../dto/pontoDto';
import { PontoRepository } from '../repository/pontoRepository';

@injectable()
export class PontoService {
    private _pontoRepository: PontoRepository;
    public constructor(@inject(PontoRepository) pontoRepository: PontoRepository) {
        this._pontoRepository = pontoRepository;
    }

    async save(ponto: PontoDto): Promise<void> {
        await this._pontoRepository.save(ponto);
    }
}
