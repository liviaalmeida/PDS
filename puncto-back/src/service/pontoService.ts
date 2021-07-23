import 'reflect-metadata';
import { injectable, inject } from 'inversify';
import { PontoInicialRequest } from '../dto/pontoInicialRequest';
import { PontoRepository } from '../repository/pontoRepository';
import { PontoDto } from '../dto/pontoDto';
import { PontoRequest } from '../dto/pontoRequest';
import { PontoAbertoDto } from '../dto/pontoAbertoDto';

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

    private createTimestampInicioMes(mes: number): number {
        var dataAtual = new Date()
        return new Date(dataAtual.getFullYear(), mes, 1).getTime();
    }

    private createTimestampFimMes(mes: number): number {
        var dataAtual = new Date()
        return new Date(dataAtual.getFullYear(), mes + 1, 0).getTime();
    }

    private preenchePontosAbertosEFechados(timestampFimMes: number, pontos: Array<PontoDto>): Array<PontoAbertoDto> {
        let numeroDias: number = new Date(timestampFimMes).getDate()
        let pontosAbertos: Array<PontoAbertoDto> = new Array<PontoAbertoDto>()

        for (let dia = 1; dia <= numeroDias; dia++) {
            let diaPossuiPontoAberto = pontos.some(it => {
                let dataEntrada = new Date(it.timestampDateEntrada)
                if (dataEntrada.getDate() == dia && (it.timestampDateSaida == undefined))
                    return true

                return false
            })
            pontosAbertos.push(new PontoAbertoDto(dia, diaPossuiPontoAberto))
        }

        return pontosAbertos

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

    async listaPontosAbertosEFechados(userEmail: string, mes: number): Promise<Array<PontoAbertoDto>> {
        var timestampInicioMes = this.createTimestampInicioMes(mes)
        var timestampFimMes = this.createTimestampFimMes(mes)
        let pontos: Array<PontoDto> = await this._pontoRepository.findPontosPorMes(userEmail, timestampInicioMes, timestampFimMes);
        return this.preenchePontosAbertosEFechados(timestampFimMes, pontos)
    }


}
