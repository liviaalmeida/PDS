import 'reflect-metadata';
import { Connection, getConnection, Repository } from 'typeorm';
import { injectable } from 'inversify';
import { PontoDto } from '../dto/pontoDto';
import { Ponto } from '../entity/Ponto';

@injectable()
export class PontoRepository {
    private getPontoRepository(): Repository<Ponto> {
        const connection: Connection = getConnection();
        return connection.getRepository(Ponto);
    }

    async save(pontoDto: PontoDto): Promise<void> {
        const repository = this.getPontoRepository();
        const ponto = new Ponto();

        ponto.email = pontoDto.email;
        ponto.timestampDate = pontoDto.timestampDate
        ponto.registroDeEntrada = pontoDto.registroDeEntrada
        await repository.save(ponto);
    }
}
