import 'reflect-metadata';
import { Between, Connection, getConnection, LessThan, LessThanOrEqual, MongoRepository, MoreThan, MoreThanOrEqual, Repository } from 'typeorm';
import { injectable } from 'inversify';
import { PontoInicialRequest } from '../dto/pontoInicialRequest';
import { Ponto } from '../entity/Ponto';
import { DatabaseErrorException } from '../exceptions/DatabaseErrorException';
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
        let newPonto = await repository.save(ponto) as PontoDto;

        return newPonto
    }

    async update(userEmail: string, pontoRequest: PontoRequest): Promise<PontoDto> {
        const repository = this.getPontoRepository();
        let pontoToUpdate = await repository.findOne(pontoRequest.id) as Ponto;

        return await repository.save({ id: pontoToUpdate.id, timestampDateEntrada: pontoRequest.timestampDateEntrada, timestampDateSaida: pontoRequest.timestampDateSaida, clienteId: pontoRequest.clienteId, descricaoAtividade: pontoRequest.descricaoAtividade }) as PontoDto
    }

    async find(userEmail: string, absoluteInitialTimestamp: number, absoluteEndTimestamp: number): Promise<Array<PontoDto>> {
        const repository = this.getPontoRepository();

        try {
            const allPontos = await repository.find({
                where: {
                    userEmail: userEmail,
                    timestampDateEntrada: {
                        $gte: absoluteInitialTimestamp
                    },
                    timestampDateSaida: {
                        $lte: absoluteEndTimestamp
                    },
                },
            }) as PontoDto[]

            return allPontos;
        } catch (error) {
            console.log(error)
            throw new DatabaseErrorException('Error finding all clientes in database.');
        }
    }

    async delete(pontoId: string): Promise<void> {
        const repository = this.getPontoRepository();
        await repository.delete(pontoId)
    }
}


