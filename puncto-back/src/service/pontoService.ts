import 'reflect-metadata';
import { injectable, inject } from 'inversify';
import { PontoInicialRequest } from '../dto/pontoInicialRequest';
import { PontoRepository } from '../repository/pontoRepository';
import { PontoDto } from '../dto/pontoDto';
import { PontoRequest } from '../dto/pontoRequest';

@injectable()
export class PontoService {
    private _pontoRepository: PontoRepository;
    public constructor(@inject(PontoRepository) pontoRepository: PontoRepository) {
        this._pontoRepository = pontoRepository;
    }

    private createAbsoluteInitialTimestamp(timestampDate: number): number {
        var date = new Date(timestampDate)
        date.setHours(0)
        date.setMinutes(0)
        date.setSeconds(0)
        date.setMilliseconds(0)

        return date.getTime()
    }

    private createAbsoluteEndTimestamp(absoluteInitialTimestamp: number): number {
        var date = new Date(absoluteInitialTimestamp)
        date.setHours(23)
        date.setMinutes(59)
        date.setSeconds(59)
        date.setMilliseconds(999)

        return date.getTime()
    }

    async save(userEmail: string, pontoInicialRequest: PontoInicialRequest): Promise<PontoDto> {
        return await this._pontoRepository.save(userEmail, pontoInicialRequest);
    }

    async update(userEmail: string, pontoRequest: PontoRequest): Promise<PontoDto> {
        return await this._pontoRepository.update(userEmail, pontoRequest);
    }

    async find(userEmail: string, timestampDate: number): Promise<Array<PontoDto>> {
        var absoluteInitialTimestamp = this.createAbsoluteInitialTimestamp(timestampDate)
        var absoluteEndTimestamp = this.createAbsoluteEndTimestamp(absoluteInitialTimestamp)

        return await this._pontoRepository.find(userEmail, absoluteInitialTimestamp, absoluteEndTimestamp);
    }

    async delete(pontoId: string): Promise<void> {
        return await this._pontoRepository.delete(pontoId);
    }
}
