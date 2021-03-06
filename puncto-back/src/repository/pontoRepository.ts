import 'reflect-metadata';
import { Connection, getConnection, Repository } from 'typeorm';
import { injectable } from 'inversify';
import { PontoInicialRequest } from '../dto/pontoInicialRequest';
import { Ponto } from '../entity/Ponto';
import { PontoDto } from '../dto/pontoDto';
import { PontoRequest } from '../dto/pontoRequest';

@injectable()
export class PontoRepository {
    private getPontoRepository(): Repository<Ponto> {
        const connection: Connection = getConnection();
        return connection.getRepository(Ponto);
    }

    async save(userEmail: string, pontoInicialRequest: PontoInicialRequest): Promise<PontoDto> {
        const repository = this.getPontoRepository();
        const ponto = new Ponto();

        ponto.timestampDateEntrada = pontoInicialRequest.timestampDateEntrada
        ponto.clienteId = pontoInicialRequest.clienteId
        ponto.descricaoAtividade = pontoInicialRequest.descricaoAtividade
        ponto.userEmail = userEmail
        const newPonto = await repository.save(ponto) as PontoDto;

        return newPonto
    }

    async update(userEmail: string, pontoRequest: PontoRequest): Promise<PontoDto> {
        const repository = this.getPontoRepository();
        const pontoToUpdate = await repository.findOne(pontoRequest.id) as Ponto;

        return await repository.save({ id: pontoToUpdate.id, timestampDateEntrada: pontoRequest.timestampDateEntrada, timestampDateSaida: pontoRequest.timestampDateSaida, clienteId: pontoRequest.clienteId, descricaoAtividade: pontoRequest.descricaoAtividade }) as PontoDto
    }

    async find(userEmail: string, timestamp: number): Promise<Array<PontoDto>> {
        const repository = this.getPontoRepository();

        const allPontos = await repository.find({
            where: {
                userEmail: userEmail,
            },
        }) as PontoDto[]

        const pontos = allPontos.filter(it => {
            const dataABuscar = new Date(timestamp);
            const diaABuscar = dataABuscar.getDate();

            const pontoDataEntrada = new Date(it.timestampDateEntrada);
            const pontoDataSaida = new Date(it.timestampDateSaida);

            const pontoDiaEntrada = pontoDataEntrada.getDate();
            const pontoDiaSaida = pontoDataSaida.getDate();

            if (pontoDiaEntrada == diaABuscar && pontoDiaSaida == diaABuscar)
                return it;
            else if (pontoDiaEntrada == diaABuscar && !pontoDiaSaida)
                return it;
        })

        return pontos;
    }

    async delete(pontoId: string): Promise<void> {
        const repository = this.getPontoRepository();
        await repository.delete(pontoId)
    }

    async findPontosPorMes(userEmail: string, timestampInicioMes: number, timestampFimMes: number): Promise<Array<PontoDto>> {
        const repository = this.getPontoRepository();
        const allPontos = await repository.find({
            where: {
                userEmail: userEmail,
                timestampDateEntrada: {
                    $gte: timestampInicioMes
                },
                $or: [{
                    timestampDateSaida: {
                        $lte: timestampFimMes,
                    }
                }, { timestampDateSaida: null }]
            },
        }) as PontoDto[]

        return allPontos;
    }
}


